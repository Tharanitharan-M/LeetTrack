import { Problem } from '../types';
import { arrayProblems } from './arrays';
import { twoPointerProblems } from './two-pointers';
import { slidingWindowProblems } from './sliding-window';
import { stackProblems } from './stack';
import { binarySearchProblems } from './binary-search';
import { linkedListProblems } from './linked-list';
import { treeProblems } from './trees';
import { trieProblems } from './tries';
import { heapProblems } from './heap';
import { backtrackingProblems } from './backtracking';
import { graphProblems } from './graphs';
import { advancedGraphProblems } from './advanced-graphs';
import { oneDDPProblems } from './1d-dynamic-programming';
import { twoDDPProblems } from './2d-dynamic-programming';
import { greedyProblems } from './greedy';
import { intervalProblems } from './intervals';
import { bitManipulationProblems } from './bit-manipulation';

export const problems: Problem[] = [
  ...arrayProblems,
  ...twoPointerProblems,
  ...slidingWindowProblems,
  ...stackProblems,
  ...binarySearchProblems,
  ...linkedListProblems,
  ...treeProblems,
  ...trieProblems,
  ...heapProblems,
  ...backtrackingProblems,
  ...graphProblems,
  ...advancedGraphProblems,
  ...oneDDPProblems,
  ...twoDDPProblems,
  ...greedyProblems,
  ...intervalProblems,
  ...bitManipulationProblems,
]; 