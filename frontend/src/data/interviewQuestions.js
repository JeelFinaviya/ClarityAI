/**
 * Master Index & Export for ClarityAI Interview Lab
 * 22 Technical Topics • 50 Curated Questions Each • 1,100 Total Questions
 * 100% Static & Free — runs locally without API calls or database dependencies.
 */

import { INTERVIEW_TOPICS, TOPIC_GROUPS } from './interview/topics';
import { HTML_QUESTIONS } from './interview/html';
import { CSS_QUESTIONS } from './interview/css';
import { JAVASCRIPT_QUESTIONS } from './interview/javascript';
import { TYPESCRIPT_QUESTIONS } from './interview/typescript';
import { REACT_QUESTIONS } from './interview/react';
import { NEXTJS_QUESTIONS } from './interview/nextjs';
import { NODEJS_QUESTIONS } from './interview/nodejs';
import { EXPRESS_QUESTIONS } from './interview/express';
import { PYTHON_QUESTIONS } from './interview/python';
import { DJANGO_QUESTIONS } from './interview/django';
import { DRF_QUESTIONS } from './interview/drf';
import { JAVA_QUESTIONS } from './interview/java';
import { SQL_QUESTIONS } from './interview/sql';
import { POSTGRESQL_QUESTIONS } from './interview/postgresql';
import { MONGODB_QUESTIONS } from './interview/mongodb';
import { DBMS_QUESTIONS } from './interview/dbms';
import { REST_APIS_QUESTIONS } from './interview/restApis';
import { GIT_QUESTIONS } from './interview/git';
import { DSA_QUESTIONS } from './interview/dsa';
import { OOP_QUESTIONS } from './interview/oop';
import { NETWORKS_QUESTIONS } from './interview/networks';
import { OS_QUESTIONS } from './interview/os';

export { INTERVIEW_TOPICS, TOPIC_GROUPS };

// Map of all questions by topic ID
export const QUESTION_BANKS = {
  html: HTML_QUESTIONS,
  css: CSS_QUESTIONS,
  javascript: JAVASCRIPT_QUESTIONS,
  typescript: TYPESCRIPT_QUESTIONS,
  react: REACT_QUESTIONS,
  nextjs: NEXTJS_QUESTIONS,
  nodejs: NODEJS_QUESTIONS,
  express: EXPRESS_QUESTIONS,
  python: PYTHON_QUESTIONS,
  django: DJANGO_QUESTIONS,
  drf: DRF_QUESTIONS,
  java: JAVA_QUESTIONS,
  sql: SQL_QUESTIONS,
  postgresql: POSTGRESQL_QUESTIONS,
  mongodb: MONGODB_QUESTIONS,
  dbms: DBMS_QUESTIONS,
  'rest-apis': REST_APIS_QUESTIONS,
  git: GIT_QUESTIONS,
  dsa: DSA_QUESTIONS,
  oop: OOP_QUESTIONS,
  networks: NETWORKS_QUESTIONS,
  os: OS_QUESTIONS,
};

/**
 * Get all questions for a specific topic ID
 */
export function getQuestionsForTopic(topicId) {
  return QUESTION_BANKS[topicId] || QUESTION_BANKS.react;
}

/**
 * Get dynamic unique categories for a specific topic ID
 */
export function getCategoriesForTopic(topicId) {
  const questions = getQuestionsForTopic(topicId);
  const categoriesSet = new Set();
  questions.forEach(q => {
    if (q.category) {
      categoriesSet.add(q.category);
    }
  });
  return ['All', ...Array.from(categoriesSet)];
}
