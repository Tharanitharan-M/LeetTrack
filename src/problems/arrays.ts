import { Problem } from '../types';

export const arrayProblems: Problem[] = [
  {
    id: '1',
    title: 'Contains Duplicate',
    difficulty: 'Easy',
    topic: 'Arrays & Hashing',
    companies: ['Amazon', 'Microsoft', 'Facebook'],
    acceptanceRate: '61%',
    leetcodeUrl: 'https://leetcode.com/problems/contains-duplicate/'
  },
  {
    id: '2',
    title: 'Valid Anagram',
    difficulty: 'Easy',
    topic: 'Arrays & Hashing',
    companies: ['Facebook', 'Amazon', 'Microsoft'],
    acceptanceRate: '62%',
    leetcodeUrl: 'https://leetcode.com/problems/valid-anagram/'
  },
  {
    id: '3',
    title: 'Two Sum',
    difficulty: 'Easy',
    topic: 'Arrays & Hashing',
    companies: ['Google', 'Amazon', 'Apple', 'Microsoft'],
    acceptanceRate: '49%',
    leetcodeUrl: 'https://leetcode.com/problems/two-sum/',
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.`,
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.'
    ],
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]'
      },
      {
        input: 'nums = [3,3], target = 6',
        output: '[0,1]'
      }
    ]
  },
  {
    id: '4',
    title: 'Group Anagrams',
    difficulty: 'Medium',
    topic: 'Arrays & Hashing',
    companies: ['Amazon', 'Microsoft', 'Facebook'],
    acceptanceRate: '65%',
    leetcodeUrl: 'https://leetcode.com/problems/group-anagrams/'
  },
  {
    id: '5',
    title: 'Top K Frequent Elements',
    difficulty: 'Medium',
    topic: 'Arrays & Hashing',
    companies: ['Facebook', 'Amazon', 'Microsoft'],
    acceptanceRate: '56%',
    leetcodeUrl: 'https://leetcode.com/problems/top-k-frequent-elements/'
  },
  {
    id: '6',
    title: 'Product of Array Except Self',
    difficulty: 'Medium',
    topic: 'Arrays & Hashing',
    companies: ['Amazon', 'Microsoft', 'Facebook'],
    acceptanceRate: '64%',
    leetcodeUrl: 'https://leetcode.com/problems/product-of-array-except-self/'
  },
  {
    id: '7',
    title: 'Valid Sudoku',
    difficulty: 'Medium',
    topic: 'Arrays & Hashing',
    companies: ['Amazon', 'Apple', 'Microsoft'],
    acceptanceRate: '57%',
    leetcodeUrl: 'https://leetcode.com/problems/valid-sudoku/'
  },
  {
    id: '8',
    title: 'Encode and Decode Strings',
    difficulty: 'Medium',
    topic: 'Arrays & Hashing',
    companies: ['Google', 'Amazon', 'Facebook'],
    acceptanceRate: '48%',
    leetcodeUrl: 'https://leetcode.com/problems/encode-and-decode-strings/'
  },
  {
    id: '9',
    title: 'Longest Consecutive Sequence',
    difficulty: 'Medium',
    topic: 'Arrays & Hashing',
    companies: ['Amazon', 'Microsoft', 'Google'],
    acceptanceRate: '46%',
    leetcodeUrl: 'https://leetcode.com/problems/longest-consecutive-sequence/'
  }
]; 