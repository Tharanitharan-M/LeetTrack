const problems = [
  {
    id: '1',
    title: 'Contains Duplicate',
    difficulty: 'Easy',
    topic: 'Arrays & Hashing',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/contains-duplicate/'
  },
  {
    id: '2',
    title: 'Valid Anagram',
    difficulty: 'Easy',
    topic: 'Arrays & Hashing',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/valid-anagram/'
  },
  {
    id: '3',
    title: 'Two Sum',
    difficulty: 'Easy',
    topic: 'Arrays & Hashing',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/two-sum/'
  },
  {
    id: '4',
    title: 'Group Anagrams',
    difficulty: 'Medium',
    topic: 'Arrays & Hashing',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/group-anagrams/'
  },
  {
    id: '5',
    title: 'Top K Frequent Elements',
    difficulty: 'Medium',
    topic: 'Arrays & Hashing',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/top-k-frequent-elements/'
  },
  {
    id: '6',
    title: 'Product of Array Except Self',
    difficulty: 'Medium',
    topic: 'Arrays & Hashing',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/product-of-array-except-self/'
  },
  {
    id: '7',
    title: 'Valid Sudoku',
    difficulty: 'Medium',
    topic: 'Arrays & Hashing',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/valid-sudoku/'
  },
  {
    id: '8',
    title: 'Encode and Decode Strings',
    difficulty: 'Medium',
    topic: 'Arrays & Hashing',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/encode-and-decode-strings/'
  },
  {
    id: '9',
    title: 'Longest Consecutive Sequence',
    difficulty: 'Medium',
    topic: 'Arrays & Hashing',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/longest-consecutive-sequence/'
  },
  {
    id: '10',
    title: 'Two Sum II - Input Array Is Sorted',
    difficulty: 'Medium',
    topic: 'Two Pointers',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/'
  },
  {
    id: '11',
    title: '3Sum',
    difficulty: 'Medium',
    topic: 'Two Pointers',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/3sum/'
  },
  {
    id: '12',
    title: 'Container With Most Water',
    difficulty: 'Medium',
    topic: 'Two Pointers',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/container-with-most-water/'
  },
  {
    id: '13',
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    topic: 'Sliding Window',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/'
  },
  {
    id: '14',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    topic: 'Sliding Window',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/'
  },
  {
    id: '15',
    title: 'Longest Repeating Character Replacement',
    difficulty: 'Medium',
    topic: 'Sliding Window',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/longest-repeating-character-replacement/'
  },
  {
    id: '16',
    title: 'Minimum Window Substring',
    difficulty: 'Hard',
    topic: 'Sliding Window',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/minimum-window-substring/'
  },
  {
    id: '17',
    title: 'Permutation in String',
    difficulty: 'Medium',
    topic: 'Sliding Window',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/permutation-in-string/'
  },
  {
    id: '18',
    title: 'Sliding Window Maximum',
    difficulty: 'Hard',
    topic: 'Sliding Window',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/sliding-window-maximum/'
  },
  {
    id: '19',
    title: 'Find Minimum in Rotated Sorted Array',
    difficulty: 'Medium',
    topic: 'Binary Search',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/'
  },
  {
    id: '20',
    title: 'Search in Rotated Sorted Array',
    difficulty: 'Medium',
    topic: 'Binary Search',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/search-in-rotated-sorted-array/'
  },
  {
    id: '21',
    title: 'Koko Eating Bananas',
    difficulty: 'Medium',
    topic: 'Binary Search',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/koko-eating-bananas/'
  },
  {
    id: '23',
    title: 'Time Based Key-Value Store',
    difficulty: 'Medium',
    topic: 'Hash Map',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/time-based-key-value-store/'
  },
  {
    id: '24',
    title: 'Design Add and Search Words Data Structure',
    difficulty: 'Medium',
    topic: 'Tries',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/design-add-and-search-words-data-structure/'
  },
  {
    id: '25',
    title: 'Word Search II',
    difficulty: 'Hard',
    topic: 'Tries',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/word-search-ii/'
  },
  {
    id: '26',
    title: 'Longest Palindromic Substring',
    difficulty: 'Medium',
    topic: 'Dynamic Programming',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/longest-palindromic-substring/'
  },
  {
    id: '27',
    title: 'Palindromic Substrings',
    difficulty: 'Medium',
    topic: 'Dynamic Programming',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/palindromic-substrings/'
  },
  {
    id: '28',
    title: 'Decode Ways',
    difficulty: 'Medium',
    topic: 'Dynamic Programming',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/decode-ways/'
  },
  {
    id: '29',
    title: 'Coin Change',
    difficulty: 'Medium',
    topic: 'Dynamic Programming',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/coin-change/'
  },
  {
    id: '30',
    title: 'Maximum Product Subarray',
    difficulty: 'Medium',
    topic: 'Dynamic Programming',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/maximum-product-subarray/'
  },
  {
    id: '31',
    title: 'House Robber',
    difficulty: 'Medium',
    topic: 'Dynamic Programming',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/house-robber/'
  },
  {
    id: '32',
    title: 'House Robber II',
    difficulty: 'Medium',
    topic: 'Dynamic Programming',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/house-robber-ii/'
  },
  {
    id: '33',
    title: 'Longest Increasing Subsequence',
    difficulty: 'Medium',
    topic: 'Dynamic Programming',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/longest-increasing-subsequence/'
  },
  {
    id: '34',
    title: 'Unique Paths',
    difficulty: 'Medium',
    topic: 'Dynamic Programming',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/unique-paths/'
  },
  {
    id: '35',
    title: 'Jump Game',
    difficulty: 'Medium',
    topic: 'Dynamic Programming',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/jump-game/'
  },
  {
    id: '36',
    title: 'Clone Graph',
    difficulty: 'Medium',
    topic: 'Graphs',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/clone-graph/'
  },
  {
    id: '37',
    title: 'Course Schedule',
    difficulty: 'Medium',
    topic: 'Graphs',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/course-schedule/'
  },
  {
    id: '38',
    title: 'Pacific Atlantic Water Flow',
    difficulty: 'Medium',
    topic: 'Graphs',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/pacific-atlantic-water-flow/'
  },
  {
    id: '39',
    title: 'Number of Islands',
    difficulty: 'Medium',
    topic: 'Graphs',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/number-of-islands/'
  },
  {
    id: '40',
    title: 'Longest Consecutive Sequence',
    difficulty: 'Medium',
    topic: 'Graphs',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/longest-consecutive-sequence/'
  },
  {
    id: '41',
    title: 'Alien Dictionary',
    difficulty: 'Hard',
    topic: 'Graphs',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/alien-dictionary/'
  },
  {
    id: '42',
    title: 'Graph Valid Tree',
    difficulty: 'Medium',
    topic: 'Graphs',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/graph-valid-tree/'
  },
  {
    id: '43',
    title: 'Redundant Connection',
    difficulty: 'Medium',
    topic: 'Graphs',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/redundant-connection/'
  },
  {
    id: '44',
    title: 'Invert Binary Tree',
    difficulty: 'Easy',
    topic: 'Trees',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/invert-binary-tree/'
  },
  {
    id: '45',
    title: 'Maximum Depth of Binary Tree',
    difficulty: 'Easy',
    topic: 'Trees',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/'
  },
  {
    id: '46',
    title: 'Diameter of Binary Tree',
    difficulty: 'Easy',
    topic: 'Trees',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/diameter-of-binary-tree/'
  },
  {
    id: '47',
    title: 'Balanced Binary Tree',
    difficulty: 'Easy',
    topic: 'Trees',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/balanced-binary-tree/'
  },
  {
    id: '48',
    title: 'Same Tree',
    difficulty: 'Easy',
    topic: 'Trees',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/same-tree/'
  },
  {
    id: '49',
    title: 'Subtree of Another Tree',
    difficulty: 'Easy',
    topic: 'Trees',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/subtree-of-another-tree/'
  },
  {
    id: '50',
    title: 'Lowest Common Ancestor of a Binary Search Tree',
    difficulty: 'Medium',
    topic: 'Trees',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/'
  },
  {
    id: '51',
    title: 'Binary Tree Level Order Traversal',
    difficulty: 'Medium',
    topic: 'Trees',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/binary-tree-level-order-traversal/'
  },
  {
    id: '52',
    title: 'Binary Tree Right Side View',
    difficulty: 'Medium',
    topic: 'Trees',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/binary-tree-right-side-view/'
  },
  {
    id: '53',
    title: 'Count Good Nodes in Binary Tree',
    difficulty: 'Medium',
    topic: 'Trees',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/count-good-nodes-in-binary-tree/'
  },
  {
    id: '54',
    title: 'Validate Binary Search Tree',
    difficulty: 'Medium',
    topic: 'Trees',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/validate-binary-search-tree/'
  },
  {
    id: '55',
    title: 'Kth Smallest Element in a BST',
    difficulty: 'Medium',
    topic: 'Trees',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/'
  },
  {
    id: '56',
    title: 'Construct Binary Tree from Preorder and Inorder Traversal',
    difficulty: 'Medium',
    topic: 'Trees',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/'
  },
  {
    id: '57',
    title: 'Binary Tree Maximum Path Sum',
    difficulty: 'Hard',
    topic: 'Trees',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/'
  },
  {
    id: '58',
    title: 'Serialize and Deserialize Binary Tree',
    difficulty: 'Hard',
    topic: 'Trees',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/'
  },
  {
    id: '59',
    title: 'Implement Trie (Prefix Tree)',
    difficulty: 'Medium',
    topic: 'Tries',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/implement-trie-prefix-tree/'
  },
  {
    id: '60',
    title: 'Design Add and Search Words Data Structure',
    difficulty: 'Medium',
    topic: 'Tries',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/design-add-and-search-words-data-structure/'
  },{
    id: '61',
    title: 'Word Search II',
    difficulty: 'Hard',
    topic: 'Tries',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/word-search-ii/'
  },
  {
    id: '62',
    title: 'Merge Two Sorted Lists',
    difficulty: 'Easy',
    topic: 'Linked List',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/merge-two-sorted-lists/'
  },
  {
    id: '63',
    title: 'Reverse Linked List',
    difficulty: 'Easy',
    topic: 'Linked List',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/reverse-linked-list/'
  },
  {
    id: '64',
    title: 'Linked List Cycle',
    difficulty: 'Easy',
    topic: 'Linked List',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/linked-list-cycle/'
  },
  {
    id: '65',
    title: 'Merge K Sorted Lists',
    difficulty: 'Hard',
    topic: 'Heap / Linked List',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/merge-k-sorted-lists/'
  },
  {
    id: '66',
    title: 'Remove Nth Node From End of List',
    difficulty: 'Medium',
    topic: 'Linked List',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/'
  },
  {
    id: '67',
    title: 'Reorder List',
    difficulty: 'Medium',
    topic: 'Linked List',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/reorder-list/'
  },
  {
    id: '68',
    title: 'Set Matrix Zeroes',
    difficulty: 'Medium',
    topic: 'Matrix',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/set-matrix-zeroes/'
  },
  {
    id: '69',
    title: 'Spiral Matrix',
    difficulty: 'Medium',
    topic: 'Matrix',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/spiral-matrix/'
  },
  {
    id: '70',
    title: 'Rotate Image',
    difficulty: 'Medium',
    topic: 'Matrix',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/rotate-image/'
  },
  {
    id: '71',
    title: 'Word Search',
    difficulty: 'Medium',
    topic: 'Matrix',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/word-search/'
  },
  {
    id: '75',
    title: 'Valid Palindrome',
    difficulty: 'Easy',
    topic: 'Two Pointers',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/valid-palindrome/'
  },
  {
    id: '79',
    title: 'Trapping Rain Water',
    difficulty: 'Hard',
    topic: 'Two Pointers',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/trapping-rain-water/'
  },
  {
    id: '81',
    title: 'Longest Palindromic Substring',
    difficulty: 'Medium',
    topic: 'Dynamic Programming',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/longest-palindromic-substring/'
  },
  {
    id: '82',
    title: 'Palindromic Substrings',
    difficulty: 'Medium',
    topic: 'Dynamic Programming',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/palindromic-substrings/'
  },
  {
    id: '83',
    title: 'Minimum Number of Arrows to Burst Balloons',
    difficulty: 'Medium',
    topic: 'Greedy',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/'
  },
  {
    id: '84',
    title: 'Non-overlapping Intervals',
    difficulty: 'Medium',
    topic: 'Greedy',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/non-overlapping-intervals/'
  },
  {
    id: '85',
    title: 'Merge Intervals',
    difficulty: 'Medium',
    topic: 'Intervals',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/merge-intervals/'
  },
  {
    id: '86',
    title: 'Insert Interval',
    difficulty: 'Medium',
    topic: 'Intervals',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/insert-interval/'
  },
  {
    id: '87',
    title: 'Interval List Intersections',
    difficulty: 'Medium',
    topic: 'Intervals',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/interval-list-intersections/'
  },
  {
    id: '88',
    title: 'Meeting Rooms',
    difficulty: 'Easy',
    topic: 'Intervals',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/meeting-rooms/'
  },
  {
    id: '89',
    title: 'Meeting Rooms II',
    difficulty: 'Medium',
    topic: 'Intervals',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/meeting-rooms-ii/'
  },
  {
    id: '90',
    title: 'Unique Email Addresses',
    difficulty: 'Easy',
    topic: 'Hash Map',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/unique-email-addresses/'
  },{
    id: '91',
    title: 'Clone Graph',
    difficulty: 'Medium',
    topic: 'Graphs',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/clone-graph/'
  },
  {
    id: '92',
    title: 'Course Schedule',
    difficulty: 'Medium',
    topic: 'Graphs',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/course-schedule/'
  },
  {
    id: '93',
    title: 'Pacific Atlantic Water Flow',
    difficulty: 'Medium',
    topic: 'Graphs',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/pacific-atlantic-water-flow/'
  },
  {
    id: '94',
    title: 'Number of Islands',
    difficulty: 'Medium',
    topic: 'Graphs',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/number-of-islands/'
  },
  {
    id: '95',
    title: 'Longest Consecutive Sequence',
    difficulty: 'Medium',
    topic: 'Graphs',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/longest-consecutive-sequence/'
  },
  {
    id: '96',
    title: 'Alien Dictionary',
    difficulty: 'Hard',
    topic: 'Graphs',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/alien-dictionary/'
  },
  {
    id: '97',
    title: 'Graph Valid Tree',
    difficulty: 'Medium',
    topic: 'Graphs',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/graph-valid-tree/'
  },
  {
    id: '98',
    title: 'Redundant Connection',
    difficulty: 'Medium',
    topic: 'Graphs',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/redundant-connection/'
  },
  {
    id: '99',
    title: 'Min Cost to Connect All Points',
    difficulty: 'Medium',
    topic: 'Graphs',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/min-cost-to-connect-all-points/'
  },
  {
    id: '100',
    title: 'Network Delay Time',
    difficulty: 'Medium',
    topic: 'Graphs',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/network-delay-time/'
  },
  {
    id: '101',
    title: 'Swim in Rising Water',
    difficulty: 'Hard',
    topic: 'Graphs',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/swim-in-rising-water/'
  },
  {
    id: '102',
    title: 'Accounts Merge',
    difficulty: 'Medium',
    topic: 'Graphs',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/accounts-merge/'
  },
  {
    id: '103',
    title: 'Evaluate Division',
    difficulty: 'Medium',
    topic: 'Graphs',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/evaluate-division/'
  },
  {
    id: '104',
    title: 'Design Twitter',
    difficulty: 'Medium',
    topic: 'Heap',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/design-twitter/'
  },
  {
    id: '105',
    title: 'Find Median from Data Stream',
    difficulty: 'Hard',
    topic: 'Heap',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/find-median-from-data-stream/'
  },
  {
    id: '106',
    title: 'Merge K Sorted Lists',
    difficulty: 'Hard',
    topic: 'Heap',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/merge-k-sorted-lists/'
  },
  {
    id: '107',
    title: 'Top K Frequent Elements',
    difficulty: 'Medium',
    topic: 'Heap',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/top-k-frequent-elements/'
  },
  {
    id: '108',
    title: 'Find K Closest Points to Origin',
    difficulty: 'Medium',
    topic: 'Heap',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/k-closest-points-to-origin/'
  },
  {
    id: '109',
    title: 'Kth Largest Element in an Array',
    difficulty: 'Medium',
    topic: 'Heap',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/kth-largest-element-in-an-array/'
  },
  {
    id: '110',
    title: 'Task Scheduler',
    difficulty: 'Medium',
    topic: 'Heap',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/task-scheduler/'
  },
  {
    id: '111',
    title: 'Merge Intervals',
    difficulty: 'Medium',
    topic: 'Intervals',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/merge-intervals/'
  },
  {
    id: '112',
    title: 'Insert Interval',
    difficulty: 'Medium',
    topic: 'Intervals',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/insert-interval/'
  },
  {
    id: '113',
    title: 'Non-overlapping Intervals',
    difficulty: 'Medium',
    topic: 'Intervals',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/non-overlapping-intervals/'
  },
  {
    id: '114',
    title: 'Meeting Rooms',
    difficulty: 'Easy',
    topic: 'Intervals',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/meeting-rooms/'
  },
  {
    id: '115',
    title: 'Meeting Rooms II',
    difficulty: 'Medium',
    topic: 'Intervals',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/meeting-rooms-ii/'
  },
  {
    id: '116',
    title: 'Minimum Interval to Include Each Query',
    difficulty: 'Hard',
    topic: 'Heap / Intervals',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/minimum-interval-to-include-each-query/'
  },
  {
    id: '117',
    title: 'Minimum Number of Arrows to Burst Balloons',
    difficulty: 'Medium',
    topic: 'Greedy',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/'
  },
  {
    id: '118',
    title: 'Task Scheduler',
    difficulty: 'Medium',
    topic: 'Greedy / Heap',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/task-scheduler/'
  },
  {
    id: '119',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    topic: 'Stack',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/valid-parentheses/'
  },
  {
    id: '120',
    title: 'Generate Parentheses',
    difficulty: 'Medium',
    topic: 'Stack',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/generate-parentheses/'
  },
  {
    id: '121',
    title: 'Daily Temperatures',
    difficulty: 'Medium',
    topic: 'Stack',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/daily-temperatures/'
  },
  {
    id: '122',
    title: 'Car Fleet',
    difficulty: 'Medium',
    topic: 'Stack',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/car-fleet/'
  },
  {
    id: '123',
    title: 'Largest Rectangle in Histogram',
    difficulty: 'Hard',
    topic: 'Stack',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/largest-rectangle-in-histogram/'
  },
  {
    id: '124',
    title: 'Binary Search',
    difficulty: 'Easy',
    topic: 'Binary Search',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/binary-search/'
  },
  {
    id: '125',
    title: 'Find Minimum in Rotated Sorted Array',
    difficulty: 'Medium',
    topic: 'Binary Search',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/'
  },
  {
    id: '126',
    title: 'Search in Rotated Sorted Array',
    difficulty: 'Medium',
    topic: 'Binary Search',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/search-in-rotated-sorted-array/'
  },
  {
    id: '127',
    title: 'Time Based Key-Value Store',
    difficulty: 'Medium',
    topic: 'Binary Search',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/time-based-key-value-store/'
  },
  {
    id: '128',
    title: 'Median of Two Sorted Arrays',
    difficulty: 'Hard',
    topic: 'Binary Search',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/median-of-two-sorted-arrays/'
  },
  {
    id: '129',
    title: 'Koko Eating Bananas',
    difficulty: 'Medium',
    topic: 'Binary Search',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/koko-eating-bananas/'
  },
  {
    id: '130',
    title: 'Minimum Eating Speed',
    difficulty: 'Medium',
    topic: 'Binary Search',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/koko-eating-bananas/'
  },
  {
    id: '131',
    title: 'Find Kth Smallest Pair Distance',
    difficulty: 'Hard',
    topic: 'Binary Search',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/find-k-th-smallest-pair-distance/'
  },
  {
    id: '132',
    title: 'Allocate Books',
    difficulty: 'Medium',
    topic: 'Binary Search',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/allocate-books/' // similar book allocation custom
  },
  {
    id: '133',
    title: 'Split Array Largest Sum',
    difficulty: 'Hard',
    topic: 'Binary Search',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/split-array-largest-sum/'
  },
  {
    id: '134',
    title: 'Subsets',
    difficulty: 'Medium',
    topic: 'Backtracking',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/subsets/'
  },
  {
    id: '135',
    title: 'Subsets II',
    difficulty: 'Medium',
    topic: 'Backtracking',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/subsets-ii/'
  },
  {
    id: '136',
    title: 'Combination Sum',
    difficulty: 'Medium',
    topic: 'Backtracking',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/combination-sum/'
  },
  {
    id: '137',
    title: 'Combination Sum II',
    difficulty: 'Medium',
    topic: 'Backtracking',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/combination-sum-ii/'
  },
  {
    id: '138',
    title: 'Word Search',
    difficulty: 'Medium',
    topic: 'Backtracking',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/word-search/'
  },
  {
    id: '139',
    title: 'Palindrome Partitioning',
    difficulty: 'Medium',
    topic: 'Backtracking',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/palindrome-partitioning/'
  },
  {
    id: '140',
    title: 'Letter Combinations of a Phone Number',
    difficulty: 'Medium',
    topic: 'Backtracking',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/letter-combinations-of-a-phone-number/'
  },
  {
    id: '141',
    title: 'N-Queens',
    difficulty: 'Hard',
    topic: 'Backtracking',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/n-queens/'
  },
  {
    id: '142',
    title: 'Sudoku Solver',
    difficulty: 'Hard',
    topic: 'Backtracking',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/sudoku-solver/'
  },
  {
    id: '143',
    title: 'Word Break',
    difficulty: 'Medium',
    topic: 'Dynamic Programming',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/word-break/'
  },
  {
    id: '144',
    title: 'Combination Sum IV',
    difficulty: 'Medium',
    topic: 'Dynamic Programming',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/combination-sum-iv/'
  },
  {
    id: '145',
    title: 'Longest Increasing Subsequence',
    difficulty: 'Medium',
    topic: 'Dynamic Programming',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/longest-increasing-subsequence/'
  },
  {
    id: '146',
    title: 'Coin Change',
    difficulty: 'Medium',
    topic: 'Dynamic Programming',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/coin-change/'
  },
  {
    id: '147',
    title: 'Maximum Product Subarray',
    difficulty: 'Medium',
    topic: 'Dynamic Programming',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/maximum-product-subarray/'
  },
  {
    id: '148',
    title: 'Longest Common Subsequence',
    difficulty: 'Medium',
    topic: 'Dynamic Programming',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/longest-common-subsequence/'
  },
  {
    id: '149',
    title: 'Edit Distance',
    difficulty: 'Hard',
    topic: 'Dynamic Programming',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/edit-distance/'
  },
  {
    id: '150',
    title: 'Burst Balloons',
    difficulty: 'Hard',
    topic: 'Dynamic Programming',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/burst-balloons/'
  },
  {
    id: '151',
    title: 'Min Stack',
    difficulty: 'Medium',
    topic: 'Stack',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/min-stack/'
  },
  {
    id: '152',
    title: 'Evaluate Reverse Polish Notation',
    difficulty: 'Medium',
    topic: 'Stack',
    companies: [],
    acceptanceRate: '',
    leetcodeUrl: 'https://leetcode.com/problems/evaluate-reverse-polish-notation/'
  }
];


module.exports = {
  problems
};
