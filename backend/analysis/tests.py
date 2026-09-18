import uuid
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from unittest.mock import patch
from google.genai.errors import ServerError
from .models import DiagnosticRecord


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
            self.assertTrue(response.data["probe"]["needs_probe"])

    def test_auto_save_when_no_probe_needed(self):
        """Test that a completed initial diagnostic with needs_probe=False is saved automatically."""
        mock_response = type('MockResponse', (), {
            'text': '''{
                "topic": "Binary Search",
                "understanding_score": 95,
                "understanding_level": "Deep First-Principles Mastery",
                "diagnostic_dimensions": {
                    "core_accuracy": 98,
                    "causal_depth": 95,
                    "relational_coherence": 92
                },
                "confidence_calibration": {
                    "status": "calibrated",
                    "gap_analysis": "Confidence (95%) matches demonstrated mastery."
                },
                "concepts_understood": [
                    {
                        "concept": "Halving search space",
                        "depth": "deep_mastery",
                        "evidence": "Discards half elements by checking mid."
                    }
                ],
                "missing_concepts": [],
                "possible_misconceptions": [],
                "summary": "Mastery of monotonic invariant and search space reduction.",
                "probe": {
                    "needs_probe": false,
                    "probe_question": "",
                    "probe_reason": ""
                }
            }'''
        })()

        with patch('analysis.gemini_service._get_api_key', return_value='mock-valid-key'), \
             patch('analysis.gemini_service.genai.Client') as mock_client_class:
            mock_instance = mock_client_class.return_value
            mock_instance.models.generate_content.return_value = mock_response

            payload = {
                "topic": "Binary Search",
                "explanation": "Binary search is an algorithm that finds elements in O(log n) time by checking the middle index of a sorted array.",
                "confidence": 95,
            }
            response = self.client.post(self.url, payload, format='json')

            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertFalse(response.data["probe"]["needs_probe"])
            self.assertIn("saved_record_id", response.data)

            # Verify saved in database
            saved_id = response.data["saved_record_id"]
            record = DiagnosticRecord.objects.get(id=saved_id)
            self.assertEqual(record.topic, "Binary Search")
            self.assertEqual(record.final_score, 95)
            self.assertEqual(record.verdict, "Deep First-Principles Mastery")

    def test_missing_topic_validation(self):
        payload = {
            "topic": "",
            "explanation": "This is a valid long explanation that exceeds thirty characters easily.",
            "confidence": 50,
        }
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("topic", response.data["details"])

    def test_short_explanation_validation(self):
        payload = {
            "topic": "DNS",
            "explanation": "Too short",
            "confidence": 50,
        }
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("explanation", response.data["details"])


class FinalDiagnoseAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse('final_diagnose_explanation')

    def test_valid_final_synthesis_and_auto_save(self):
        """Test final synthesis and verify that DiagnosticRecord is automatically persisted."""
        mock_response = type('MockResponse', (), {
            'text': '''{
                "topic": "Binary Search",
                "understanding_score": 88,
                "understanding_level": "Deep First-Principles Mastery",
                "diagnostic_dimensions": {
                    "core_accuracy": 92,
                    "causal_depth": 88,
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
            self.assertIn("saved_record_id", response.data)

            # Check DB record
            record = DiagnosticRecord.objects.get(id=response.data["saved_record_id"])
            self.assertEqual(record.topic, "Binary Search")
            self.assertEqual(record.final_score, 88)
            self.assertEqual(record.confidence, 90)
            self.assertEqual(record.probe_question, payload["probe_question"])
            self.assertEqual(record.probe_answer, payload["probe_answer"])


class DiagnosticHistoryAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.list_url = reverse('diagnostic_history_list')

    def test_empty_history(self):
        """Test GET /api/history/ when no diagnostics have been run."""
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [])

    def test_history_list_and_search_and_sort(self):
        """Test listing, searching, and sorting history records."""
        # Create multiple diagnostic records
        r1 = DiagnosticRecord.objects.create(
            topic="CAP Theorem",
            initial_explanation="Consistency, Availability, and Partition Tolerance tradeoffs in distributed systems.",
            confidence=85,
            final_score=72,
            verdict="Causal Mechanism",
            summary="Good grasp of network partition tradeoffs.",
            core_accuracy=80,
            causal_depth=70,
            relational_coherence=66,
        )
        r2 = DiagnosticRecord.objects.create(
            topic="Binary Search",
            initial_explanation="Searching sorted lists by halving search space via middle element comparison.",
            confidence=95,
            final_score=94,
            verdict="Deep First-Principles Mastery",
            summary="Excellent grasp of monotonic invariant.",
            core_accuracy=98,
            causal_depth=95,
            relational_coherence=90,
        )
        r3 = DiagnosticRecord.objects.create(
            topic="Raft Consensus",
            initial_explanation="Leader election and log replication algorithm for replicated state machines.",
            confidence=60,
            final_score=58,
            verdict="Surface Familiarity",
            summary="Understands high-level election, gaps in term invariants.",
            core_accuracy=65,
            causal_depth=55,
            relational_coherence=54,
        )

        # 1. Default list (newest first)
        res = self.client.get(self.list_url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 3)
        self.assertEqual(res.data[0]["topic"], "Raft Consensus")

        # 2. Search query
        res_search = self.client.get(f"{self.list_url}?search=binary")
        self.assertEqual(res_search.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res_search.data), 1)
        self.assertEqual(res_search.data[0]["topic"], "Binary Search")

        # 3. Sort highest first
        res_highest = self.client.get(f"{self.list_url}?sort=highest")
        self.assertEqual(res_highest.status_code, status.HTTP_200_OK)
        self.assertEqual(res_highest.data[0]["topic"], "Binary Search")
        self.assertEqual(res_highest.data[0]["final_score"], 94)

        # 4. Sort lowest first
        res_lowest = self.client.get(f"{self.list_url}?sort=lowest")
        self.assertEqual(res_lowest.status_code, status.HTTP_200_OK)
        self.assertEqual(res_lowest.data[0]["topic"], "Raft Consensus")
        self.assertEqual(res_lowest.data[0]["final_score"], 58)

    def test_history_detail(self):
        """Test GET /api/history/<uuid:pk>/ returns complete record fields."""
        record = DiagnosticRecord.objects.create(
            topic="Photosynthesis",
            initial_explanation="Process by which plants convert water and CO2 into glucose and oxygen using light.",
            confidence=75,
            final_score=82,
            verdict="Causal Mechanism",
            summary="Solid breakdown of thylakoid light reactions and Calvin cycle.",
            core_accuracy=88,
            causal_depth=80,
            relational_coherence=78,
            demonstrated_concepts=[{"concept": "Light-dependent reactions", "evidence": "Splits H2O into O2"}],
            missing_concepts=[{"concept": "Rubisco enzyme limitations", "importance": "Photorespiration"}],
            full_result={"understanding_score": 82, "summary": "Detailed light and dark reaction mechanism."},
        )

        detail_url = reverse('diagnostic_history_detail', kwargs={'pk': record.id})
        res = self.client.get(detail_url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data["topic"], "Photosynthesis")
        self.assertEqual(res.data["final_score"], 82)
        self.assertEqual(len(res.data["demonstrated_concepts"]), 1)
        self.assertEqual(res.data["demonstrated_concepts"][0]["concept"], "Light-dependent reactions")

    def test_history_delete(self):
        """Test DELETE /api/history/<uuid:pk>/ deletes the record."""
        record = DiagnosticRecord.objects.create(
            topic="Temporary Concept",
            initial_explanation="Temporary explanation for delete testing purposes.",
            confidence=50,
            final_score=50,
            verdict="Evaluated",
            summary="To be deleted.",
        )

        detail_url = reverse('diagnostic_history_detail', kwargs={'pk': record.id})
        del_res = self.client.delete(detail_url)
        self.assertEqual(del_res.status_code, status.HTTP_200_OK)
        self.assertFalse(DiagnosticRecord.objects.filter(id=record.id).exists())

    def test_manual_history_save(self):
        """Test POST /api/history/ for manually archiving a skipped-probe diagnostic."""
        payload = {
            "topic": "Backpropagation",
            "explanation": "Computing partial derivatives of loss with respect to weights using chain rule.",
            "confidence": 75,
            "diagnostic_result": {
                "understanding_score": 80,
                "understanding_level": "Solid Mechanical Understanding",
                "summary": "Demonstrated chain rule application.",
                "diagnostic_dimensions": {
                    "core_accuracy": 85,
                    "causal_depth": 78,
                    "relational_coherence": 76,
                },
                "concepts_understood": [{"concept": "Chain rule gradient flow"}],
                "missing_concepts": [],
            }
        }
        res = self.client.post(self.list_url, payload, format='json')
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertIn("id", res.data)
        self.assertTrue(DiagnosticRecord.objects.filter(topic="Backpropagation").exists())


class MCQAssessmentAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.generate_url = reverse('mcq_generate')
        self.submit_url = reverse('mcq_submit')

    def _make_mock_mcq_response(self, topic="React Virtual DOM", count=3):
        questions = []
        for i in range(1, count + 1):
            questions.append({
                "id": f"q{i}",
                "question": f"Mechanistic inquiry question {i} regarding {topic}?",
                "options": [
                    f"Option A for {topic} mechanism {i}",
                    f"Option B for {topic} mechanism {i}",
                    f"Option C for {topic} mechanism {i}",
                    f"Option D for {topic} mechanism {i}",
                ],
                "correct_answer": (i - 1) % 4,
                "explanation": f"Detailed reason why option {(i - 1) % 4} is scientifically accurate.",
                "concept": f"Concept {i}",
                "difficulty": "medium",
            })
        
        import json
        return type('MockResponse', (), {
            'text': json.dumps({
                "topic": topic,
                "questions": questions
            })
        })()

    def test_generate_3_mcqs_quick(self):
        """Test generating 3 quick MCQs."""
        mock_resp = self._make_mock_mcq_response(topic="React Virtual DOM", count=3)
        with patch('analysis.gemini_service._get_api_key', return_value='mock-valid-key'), \
             patch('analysis.gemini_service.genai.Client') as mock_client_class:
            mock_instance = mock_client_class.return_value
            mock_instance.models.generate_content.return_value = mock_resp

            payload = {
                "topic": "React Virtual DOM",
                "explanation": "The Virtual DOM is an in-memory representation of UI that minimizes expensive browser DOM operations through diffing.",
                "confidence": 90,
                "question_count": 3,
            }
            res = self.client.post(self.generate_url, payload, format='json')
            self.assertEqual(res.status_code, status.HTTP_200_OK)
            self.assertEqual(len(res.data["questions"]), 3)
            self.assertIn("assessment_token", res.data)

    def test_generate_5_mcqs_standard(self):
        """Test generating 5 standard MCQs."""
        mock_resp = self._make_mock_mcq_response(topic="Binary Search", count=5)
        with patch('analysis.gemini_service._get_api_key', return_value='mock-valid-key'), \
             patch('analysis.gemini_service.genai.Client') as mock_client_class:
            mock_instance = mock_client_class.return_value
            mock_instance.models.generate_content.return_value = mock_resp

            payload = {
                "topic": "Binary Search",
                "explanation": "Binary search divides the search space in half at each step by comparing target with mid in a sorted array.",
                "confidence": 75,
                "question_count": 5,
            }
            res = self.client.post(self.generate_url, payload, format='json')
            self.assertEqual(res.status_code, status.HTTP_200_OK)
            self.assertEqual(len(res.data["questions"]), 5)

    def test_generate_7_mcqs_deep(self):
        """Test generating 7 deep MCQs."""
        mock_resp = self._make_mock_mcq_response(topic="CAP Theorem", count=7)
        with patch('analysis.gemini_service._get_api_key', return_value='mock-valid-key'), \
             patch('analysis.gemini_service.genai.Client') as mock_client_class:
            mock_instance = mock_client_class.return_value
            mock_instance.models.generate_content.return_value = mock_resp

            payload = {
                "topic": "CAP Theorem",
                "explanation": "Distributed data stores can only guarantee at most two out of Consistency, Availability, and Partition Tolerance.",
                "confidence": 40,
                "question_count": 7,
            }
            res = self.client.post(self.generate_url, payload, format='json')
            self.assertEqual(res.status_code, status.HTTP_200_OK)
            self.assertEqual(len(res.data["questions"]), 7)

    def test_mcq_structure_and_security(self):
        """Verify exactly 4 options per question and that correct_answer is NEVER sent in API response."""
        mock_resp = self._make_mock_mcq_response(topic="DNS Resolution", count=3)
        with patch('analysis.gemini_service._get_api_key', return_value='mock-valid-key'), \
             patch('analysis.gemini_service.genai.Client') as mock_client_class:
            mock_instance = mock_client_class.return_value
            mock_instance.models.generate_content.return_value = mock_resp

            payload = {
                "topic": "DNS Resolution",
                "explanation": "DNS resolution translates human-readable domain names into IP addresses through hierarchical nameserver queries.",
                "confidence": 85,
                "question_count": 3,
            }
            res = self.client.post(self.generate_url, payload, format='json')
            self.assertEqual(res.status_code, status.HTTP_200_OK)

            for q in res.data["questions"]:
                self.assertEqual(len(q["options"]), 4)
                self.assertNotIn("correct_answer", q)
                self.assertNotIn("explanation", q)
                self.assertIn("id", q)
                self.assertIn("question", q)
                self.assertIn("concept", q)
                self.assertIn("difficulty", q)

    def test_malformed_gemini_response_rejected(self):
        """Test that malformed JSON or schema non-conformance from Gemini returns 502."""
        mock_resp = type('MockResponse', (), {
            'text': '{"invalid": "schema"}'
        })()
        with patch('analysis.gemini_service._get_api_key', return_value='mock-valid-key'), \
             patch('analysis.gemini_service.genai.Client') as mock_client_class:
            mock_instance = mock_client_class.return_value
            mock_instance.models.generate_content.return_value = mock_resp

            payload = {
                "topic": "DNS Resolution",
                "explanation": "DNS resolution translates human-readable domain names into IP addresses through hierarchical nameserver queries.",
                "confidence": 85,
            }
            res = self.client.post(self.generate_url, payload, format='json')
            self.assertEqual(res.status_code, status.HTTP_502_BAD_GATEWAY)

    def test_mcq_submit_success_and_auto_save(self):
        """Test valid MCQ submission produces synthesized diagnostic and saves to DB."""
        # 1. Generate MCQs
        mock_mcq_resp = self._make_mock_mcq_response(topic="React Virtual DOM", count=3)
        mock_synthesis_resp = type('MockResponse', (), {
            'text': '''{
                "topic": "React Virtual DOM",
                "understanding_score": 85,
                "understanding_level": "Solid Mechanical Understanding",
                "diagnostic_dimensions": {
                    "core_accuracy": 90,
                    "causal_depth": 85,
                    "relational_coherence": 80
                },
                "confidence_calibration": {
                    "status": "calibrated",
                    "gap_analysis": "Confidence matches strong demonstrated MCQ mechanism comprehension."
                },
                "concepts_understood": [
                    {
                        "concept": "Reconciliation Diffing",
                        "depth": "causal_mechanism",
                        "evidence": "Correctly identified tree diffing in MCQ assessment."
                    }
                ],
                "missing_concepts": [],
                "possible_misconceptions": [],
                "summary": "Demonstrated solid mechanical understanding of Virtual DOM reconciliation.",
                "diagnostic_journey": {
                    "initial_hypothesis": "Initial explanation defined Virtual DOM accurately.",
                    "investigated_gap": "Targeted reconciliation invariants and update scheduling.",
                    "followup_finding": "Student correctly answered mechanistic questions.",
                    "synthesis_summary": "Upgraded understanding score based on empirical evidence."
                }
            }'''
        })()

        with patch('analysis.gemini_service._get_api_key', return_value='mock-valid-key'), \
             patch('analysis.gemini_service.genai.Client') as mock_client_class:
            mock_instance = mock_client_class.return_value
            mock_instance.models.generate_content.side_effect = [mock_mcq_resp, mock_synthesis_resp]

            gen_payload = {
                "topic": "React Virtual DOM",
                "explanation": "The Virtual DOM is an in-memory representation of UI that minimizes expensive browser DOM operations through diffing.",
                "confidence": 85,
                "question_count": 3,
            }
            gen_res = self.client.post(self.generate_url, gen_payload, format='json')
            token = gen_res.data["assessment_token"]

            submit_payload = {
                "assessment_token": token,
                "topic": "React Virtual DOM",
                "initial_explanation": "The Virtual DOM is an in-memory representation of UI that minimizes expensive browser DOM operations through diffing.",
                "confidence": 85,
                "answers": [
                    {"question_id": "q1", "selected_option": 0},
                    {"question_id": "q2", "selected_option": 1},
                    {"question_id": "q3", "selected_option": 2},
                ]
            }
            submit_res = self.client.post(self.submit_url, submit_payload, format='json')
            self.assertEqual(submit_res.status_code, status.HTTP_200_OK)
            self.assertEqual(submit_res.data["topic"], "React Virtual DOM")
            self.assertEqual(submit_res.data["understanding_score"], 85)
            self.assertIn("saved_record_id", submit_res.data)

            # Check DB record
            record = DiagnosticRecord.objects.get(id=submit_res.data["saved_record_id"])
            self.assertEqual(record.topic, "React Virtual DOM")
            self.assertEqual(record.final_score, 85)

    def test_mcq_submit_missing_answer_rejected(self):
        """Test submitting incomplete answers returns 400 Bad Request."""
        mock_mcq_resp = self._make_mock_mcq_response(topic="React Virtual DOM", count=3)
        with patch('analysis.gemini_service._get_api_key', return_value='mock-valid-key'), \
             patch('analysis.gemini_service.genai.Client') as mock_client_class:
            mock_instance = mock_client_class.return_value
            mock_instance.models.generate_content.return_value = mock_mcq_resp

            gen_res = self.client.post(self.generate_url, {
                "topic": "React Virtual DOM",
                "explanation": "The Virtual DOM is an in-memory representation of UI that minimizes expensive browser DOM operations through diffing.",
                "confidence": 85,
                "question_count": 3,
            }, format='json')
            token = gen_res.data["assessment_token"]

            # Only answer q1 and q2, missing q3
            submit_res = self.client.post(self.submit_url, {
                "assessment_token": token,
                "topic": "React Virtual DOM",
                "initial_explanation": "The Virtual DOM is an in-memory representation of UI that minimizes expensive browser DOM operations through diffing.",
                "confidence": 85,
                "answers": [
                    {"question_id": "q1", "selected_option": 0},
                    {"question_id": "q2", "selected_option": 1},
                ]
            }, format='json')
            self.assertEqual(submit_res.status_code, status.HTTP_400_BAD_REQUEST)
            self.assertIn("Missing answers", submit_res.data["message"])

    def test_mcq_submit_invalid_question_id_rejected(self):
        """Test submitting unrecognized question IDs returns 400 Bad Request."""
        mock_mcq_resp = self._make_mock_mcq_response(topic="React Virtual DOM", count=3)
        with patch('analysis.gemini_service._get_api_key', return_value='mock-valid-key'), \
             patch('analysis.gemini_service.genai.Client') as mock_client_class:
            mock_instance = mock_client_class.return_value
            mock_instance.models.generate_content.return_value = mock_mcq_resp

            gen_res = self.client.post(self.generate_url, {
                "topic": "React Virtual DOM",
                "explanation": "The Virtual DOM is an in-memory representation of UI that minimizes expensive browser DOM operations through diffing.",
                "confidence": 85,
                "question_count": 3,
            }, format='json')
            token = gen_res.data["assessment_token"]

            submit_res = self.client.post(self.submit_url, {
                "assessment_token": token,
                "topic": "React Virtual DOM",
                "initial_explanation": "The Virtual DOM is an in-memory representation of UI that minimizes expensive browser DOM operations through diffing.",
                "confidence": 85,
                "answers": [
                    {"question_id": "q1", "selected_option": 0},
                    {"question_id": "q2", "selected_option": 1},
                    {"question_id": "q999_fake", "selected_option": 2},
                ]
            }, format='json')
            self.assertEqual(submit_res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_mcq_submit_invalid_selected_option_rejected(self):
        """Test selected option out of bounds (e.g. 5) returns 400 Bad Request."""
        mock_mcq_resp = self._make_mock_mcq_response(topic="React Virtual DOM", count=3)
        with patch('analysis.gemini_service._get_api_key', return_value='mock-valid-key'), \
             patch('analysis.gemini_service.genai.Client') as mock_client_class:
            mock_instance = mock_client_class.return_value
            mock_instance.models.generate_content.return_value = mock_mcq_resp

            gen_res = self.client.post(self.generate_url, {
                "topic": "React Virtual DOM",
                "explanation": "The Virtual DOM is an in-memory representation of UI that minimizes expensive browser DOM operations through diffing.",
                "confidence": 85,
                "question_count": 3,
            }, format='json')
            token = gen_res.data["assessment_token"]

            submit_res = self.client.post(self.submit_url, {
                "assessment_token": token,
                "topic": "React Virtual DOM",
                "initial_explanation": "The Virtual DOM is an in-memory representation of UI that minimizes expensive browser DOM operations through diffing.",
                "confidence": 85,
                "answers": [
                    {"question_id": "q1", "selected_option": 0},
                    {"question_id": "q2", "selected_option": 1},
                    {"question_id": "q3", "selected_option": 9},
                ]
            }, format='json')
            self.assertEqual(submit_res.status_code, status.HTTP_400_BAD_REQUEST)

