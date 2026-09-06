from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from unittest.mock import patch
from google.genai.errors import ServerError


class AnalyzeAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse('analyze_explanation')

    def test_valid_request_success(self):
        """Test that a valid request produces a 200 OK with the expected diagnostic response structure."""
        mock_response = type('MockResponse', (), {
            'text': '''{
                "topic": "React Virtual DOM",
                "understanding_score": 78,
                "understanding_level": "Solid Mechanical Understanding",
                "diagnostic_dimensions": {
                    "core_accuracy": 85,
                    "causal_depth": 75,
                    "relational_coherence": 74
                },
                "confidence_calibration": {
                    "status": "calibrated",
                    "gap_analysis": "Confidence (80%) matches demonstrated working grasp of diffing and reconciliation."
                },
                "concepts_understood": [
                    {
                        "concept": "In-memory UI representation",
                        "depth": "causal_mechanism",
                        "evidence": "Minimizes expensive browser DOM operations through diffing."
                    },
                    {
                        "concept": "Virtual DOM reconciliation",
                        "depth": "causal_mechanism",
                        "evidence": "Diffing virtual trees to compute minimum mutations."
                    }
                ],
                "missing_concepts": [
                    {
                        "concept": "Reconciliation fiber architecture",
                        "why_it_matters": "Explains how updates can be paused and scheduled across frames."
                    }
                ],
                "possible_misconceptions": [],
                "summary": "Solid understanding of the core Virtual DOM mechanism and performance benefits.",
                "probe": {
                    "needs_probe": true,
                    "probe_question": "How does React fiber prioritize urgent updates like user typing over background rendering?",
                    "probe_reason": "Investigating understanding of scheduled reconciliation mechanics."
                }
            }'''
        })()

        with patch('analysis.gemini_service._get_api_key', return_value='mock-valid-key'), \
             patch('analysis.gemini_service.genai.Client') as mock_client_class:
            mock_instance = mock_client_class.return_value
            mock_instance.models.generate_content.return_value = mock_response

            payload = {
                "topic": "React Virtual DOM",
                "explanation": "The Virtual DOM is an in-memory representation of UI that minimizes expensive browser DOM operations through diffing.",
                "confidence": 80,
            }
            response = self.client.post(self.url, payload, format='json')

            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertEqual(response.data["topic"], "React Virtual DOM")
            self.assertEqual(response.data["understanding_score"], 78)
            self.assertEqual(response.data["understanding_level"], "Solid Mechanical Understanding")
            self.assertIn("diagnostic_dimensions", response.data)
            self.assertEqual(response.data["diagnostic_dimensions"]["causal_depth"], 75)
            self.assertEqual(response.data["confidence_calibration"]["status"], "calibrated")
            self.assertEqual(len(response.data["concepts_understood"]), 2)
            self.assertEqual(response.data["concepts_understood"][0]["depth"], "causal_mechanism")
            self.assertEqual(len(response.data["missing_concepts"]), 1)
            self.assertEqual(len(response.data["possible_misconceptions"]), 0)
            self.assertTrue(response.data["probe"]["needs_probe"])
            self.assertIn("React fiber", response.data["probe"]["probe_question"])
            self.assertIn("Solid understanding", response.data["summary"])

    def test_empty_topic_validation(self):
        """Test that an empty topic returns a 400 Bad Request."""
        payload = {
            "topic": "",
            "explanation": "This is a valid explanation that exceeds thirty characters easily.",
            "confidence": 75,
        }
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("topic", response.data["details"])

    def test_short_topic_validation(self):
        """Test that a 1-character topic fails minimum length validation."""
        payload = {
            "topic": "A",
            "explanation": "This is a valid explanation that exceeds thirty characters easily.",
            "confidence": 75,
        }
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("topic", response.data["details"])

    def test_long_topic_validation(self):
        """Test that an excessively long topic fails maximum length validation."""
        payload = {
            "topic": "A" * 256,
            "explanation": "This is a valid explanation that exceeds thirty characters easily.",
            "confidence": 75,
        }
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("topic", response.data["details"])

    def test_empty_explanation_validation(self):
        """Test that an empty explanation returns a 400 Bad Request."""
        payload = {
            "topic": "React Virtual DOM",
            "explanation": "",
            "confidence": 75,
        }
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("explanation", response.data["details"])

    def test_short_explanation_validation(self):
        """Test that an explanation under 30 characters returns 400 Bad Request."""
        payload = {
            "topic": "React Virtual DOM",
            "explanation": "Too brief explanation",
            "confidence": 75,
        }
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("explanation", response.data["details"])

    def test_long_explanation_validation(self):
        """Test that an explanation over 5000 characters returns 400 Bad Request."""
        payload = {
            "topic": "React Virtual DOM",
            "explanation": "A" * 5001,
            "confidence": 75,
        }
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("explanation", response.data["details"])

    def test_invalid_confidence_negative(self):
        """Test that negative confidence score returns 400 Bad Request."""
        payload = {
            "topic": "React Virtual DOM",
            "explanation": "This is a valid explanation that exceeds thirty characters easily.",
            "confidence": -5,
        }
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("confidence", response.data["details"])

    def test_invalid_confidence_over_100(self):
        """Test that confidence score over 100 returns 400 Bad Request."""
        payload = {
            "topic": "React Virtual DOM",
            "explanation": "This is a valid explanation that exceeds thirty characters easily.",
            "confidence": 150,
        }
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("confidence", response.data["details"])

    @patch('analysis.gemini_service._get_api_key', return_value='')
    def test_missing_api_key_returns_503(self, mock_key):
        """Test that a missing API key returns a 503 Service Unavailable."""
        payload = {
            "topic": "React Virtual DOM",
            "explanation": "The Virtual DOM is an in-memory representation of UI that minimizes expensive browser DOM operations through diffing.",
            "confidence": 80,
        }
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_503_SERVICE_UNAVAILABLE)
        self.assertEqual(response.data["error"], "AI Service Unconfigured")

    @patch('analysis.gemini_service.genai.Client')
    @patch('analysis.gemini_service._get_api_key', return_value='mock-valid-key')
    def test_upstream_gemini_api_error_returns_502(self, mock_key, mock_client_class):
        """Test that an upstream Gemini ServerError returns a clean 502 Bad Gateway."""
        mock_instance = mock_client_class.return_value
        mock_instance.models.generate_content.side_effect = ServerError(500, "Service Unavailable")

        payload = {
            "topic": "React Virtual DOM",
            "explanation": "The Virtual DOM is an in-memory representation of UI that minimizes expensive browser DOM operations through diffing.",
            "confidence": 80,
        }
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_502_BAD_GATEWAY)
        self.assertEqual(response.data["error"], "AI Service Unavailable")

    @patch('analysis.gemini_service.genai.Client')
    @patch('analysis.gemini_service._get_api_key', return_value='mock-valid-key')
    def test_malformed_json_response_returns_502(self, mock_key, mock_client_class):
        """Test that malformed/non-JSON response from AI returns a 502 Bad Gateway."""
        mock_response = type('MockResponse', (), {
            'text': 'Not Valid JSON { [ }'
        })()
        mock_instance = mock_client_class.return_value
        mock_instance.models.generate_content.return_value = mock_response

        payload = {
            "topic": "React Virtual DOM",
            "explanation": "The Virtual DOM is an in-memory representation of UI that minimizes expensive browser DOM operations through diffing.",
            "confidence": 80,
        }
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_502_BAD_GATEWAY)
        self.assertEqual(response.data["error"], "Invalid AI Response")

    @patch('analysis.gemini_service.genai.Client')
    @patch('analysis.gemini_service._get_api_key', return_value='mock-valid-key')
    def test_schema_out_of_bounds_score_returns_502(self, mock_key, mock_client_class):
        """Test that an out-of-bounds score (e.g. 150%) fails schema validation and returns 502."""
        mock_response = type('MockResponse', (), {
            'text': '''{
                "topic": "React Virtual DOM",
                "understanding_score": 150,
                "understanding_level": "Solid Mechanical Understanding",
                "diagnostic_dimensions": {
                    "core_accuracy": 85,
                    "causal_depth": 75,
                    "relational_coherence": 74
                },
                "confidence_calibration": {
                    "status": "calibrated",
                    "gap_analysis": "Confidence matches score."
                },
                "concepts_understood": [],
                "missing_concepts": [],
                "possible_misconceptions": [],
                "summary": "Invalid score response.",
                "probe": {
                    "needs_probe": false,
                    "probe_question": "",
                    "probe_reason": ""
                }
            }'''
        })()
        mock_instance = mock_client_class.return_value
        mock_instance.models.generate_content.return_value = mock_response

        payload = {
            "topic": "React Virtual DOM",
            "explanation": "The Virtual DOM is an in-memory representation of UI that minimizes expensive browser DOM operations through diffing.",
            "confidence": 80,
        }
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_502_BAD_GATEWAY)
        self.assertEqual(response.data["error"], "Invalid AI Response")


class FinalDiagnoseAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse('final_diagnose_explanation')

    def test_successful_final_synthesis(self):
        """Test that Stage 2 final synthesis generates complete diagnostic with journey."""
        mock_response = type('MockResponse', (), {
            'text': '''{
                "topic": "Binary Search",
                "understanding_score": 88,
                "understanding_level": "Solid Mechanical Understanding",
                "diagnostic_dimensions": {
                    "core_accuracy": 95,
                    "causal_depth": 85,
                    "relational_coherence": 85
                },
                "confidence_calibration": {
                    "status": "calibrated",
                    "gap_analysis": "Self-assessed confidence (90%) closely matches demonstrated mechanical depth."
                },
                "concepts_understood": [
                    {
                        "concept": "Halving search space via middle element",
                        "depth": "causal_mechanism",
                        "evidence": "Comparing with mid allows discarding the entire half where the target cannot exist."
                    },
                    {
                        "concept": "Sorted array invariant prerequisite",
                        "depth": "deep_mastery",
                        "evidence": "Because the elements are sorted monotonically, target < mid implies target is strictly in left partition."
                    }
                ],
                "missing_concepts": [],
                "possible_misconceptions": [],
                "summary": "Demonstrated solid causal understanding of the halving mechanism and prerequisite constraints.",
                "diagnostic_journey": {
                    "initial_hypothesis": "Initial explanation defined time complexity but omitted why sorting enables halving.",
                    "investigated_gap": "Investigated the causal reason why a sorted array enables discarding half the remaining elements.",
                    "followup_finding": "The student clearly articulated the monotonic invariant and partition elimination mechanism.",
                    "synthesis_summary": "Confirmed deep mechanical grasp and upgraded understanding tier."
                }
            }'''
        })()

        with patch('analysis.gemini_service._get_api_key', return_value='mock-valid-key'), \
             patch('analysis.gemini_service.genai.Client') as mock_client_class:
            mock_instance = mock_client_class.return_value
            mock_instance.models.generate_content.return_value = mock_response

            payload = {
                "topic": "Binary Search",
                "initial_explanation": "Binary search is an algorithm that finds elements in O(log n) time by checking the middle index.",
                "confidence": 90,
                "probe_question": "Why does a sorted array allow Binary Search to safely eliminate one half of the elements after comparing with mid?",
                "probe_answer": "Because the array is monotonically sorted, if target < mid, all elements to the right of mid must also be greater than target, so we can discard the entire right half.",
            }
            response = self.client.post(self.url, payload, format='json')

            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertEqual(response.data["topic"], "Binary Search")
            self.assertEqual(response.data["understanding_score"], 88)
            self.assertIn("diagnostic_journey", response.data)
            self.assertEqual(response.data["diagnostic_journey"]["investigated_gap"], "Investigated the causal reason why a sorted array enables discarding half the remaining elements.")

    def test_short_probe_answer_validation(self):
        """Test that a probe answer under 10 chars fails validation."""
        payload = {
            "topic": "Binary Search",
            "initial_explanation": "Binary search is an algorithm that finds elements in O(log n) time by checking the middle index.",
            "confidence": 90,
            "probe_question": "Why does a sorted array allow Binary Search to safely eliminate one half?",
            "probe_answer": "Too short",
        }
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("probe_answer", response.data["details"])

