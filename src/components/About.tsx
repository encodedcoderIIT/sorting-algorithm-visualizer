import React, { useState } from "react";
import Layout from "./Layout";

interface Complexity {
  "Time (Best)": string;
  "Time (Average)": string;
  "Time (Worst)": string;
  Space: string;
}

interface ProsAndCons {
  pros: string[];
  cons: string[];
}

interface Algorithm {
  title: string;
  complexity: Complexity;
  description: string;
  code: string;
  useCases: string[];
  prosAndCons: ProsAndCons;
}

const SortingAlgorithm: React.FC<Algorithm> = ({
  title,
  complexity,
  description,
  code,
  useCases,
  prosAndCons,
}) => {
  const [copied, setCopied] = React.useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Complexity Section */}
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-2">Time & Space Complexity</h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(complexity).map(([key, value]) => (
            <div key={key} className="bg-slate-100 p-2 rounded">
              <span className="font-medium">{key}: </span>
              <span>{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-2">How it Works</h3>
        <p className="text-slate-700">{description}</p>
      </div>

      {/* Code Example */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Implementation</h3>
          <button
            onClick={copyCode}
            className="px-3 py-1 bg-slate-200 rounded hover:bg-slate-300 flex items-center gap-2 transition-colors"
          >
            {copied ? "Copied!" : "Copy Code"}
          </button>
        </div>
        <pre className="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-x-auto">
          <code>{code}</code>
        </pre>
      </div>

      {/* Use Cases */}
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-2">Use Cases</h3>
        <ul className="list-disc list-inside space-y-1">
          {useCases.map((useCase, index) => (
            <li key={index} className="text-slate-700">
              {useCase}
            </li>
          ))}
        </ul>
      </div>

      {/* Pros and Cons */}
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-2">Pros and Cons</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-green-600 mb-2">Pros</h4>
            <ul className="list-disc list-inside space-y-1">
              {prosAndCons.pros.map((pro, index) => (
                <li key={index} className="text-slate-700">
                  {pro}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-red-600 mb-2">Cons</h4>
            <ul className="list-disc list-inside space-y-1">
              {prosAndCons.cons.map((con, index) => (
                <li key={index} className="text-slate-700">
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const About: React.FC = () => {
  const [openAlgorithm, setOpenAlgorithm] = useState<string | null>(null);

  const algorithms: Record<string, Algorithm> = {
    bubble: {
      title: "Bubble Sort",
      complexity: {
        "Time (Best)": "O(n)",
        "Time (Average)": "O(n²)",
        "Time (Worst)": "O(n²)",
        Space: "O(1)",
      },
      description:
        "Bubble Sort is the simplest sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
      code: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
      useCases: [
        "Small datasets",
        "Educational purposes",
        "When simplicity is preferred over efficiency",
        "Nearly sorted arrays",
      ],
      prosAndCons: {
        pros: [
          "Simple to understand and implement",
          "Requires no extra memory",
          "Stable sorting algorithm",
          "Adaptive - efficient for data that is already substantially sorted",
        ],
        cons: [
          "Poor time complexity of O(n²)",
          "Not suitable for large datasets",
          "Not very efficient on most real-world problems",
        ],
      },
    },
    insertion: {
      title: "Insertion Sort",
      complexity: {
        "Time (Best)": "O(n)",
        "Time (Average)": "O(n²)",
        "Time (Worst)": "O(n²)",
        Space: "O(1)",
      },
      description:
        "Insertion Sort builds the final sorted array one item at a time. It takes each element from the unsorted part and places it in its correct position in the sorted part.",
      code: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let current = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = current;
  }
  return arr;
}`,
      useCases: [
        "Small datasets",
        "Nearly sorted arrays",
        "Online sorting (sorting data as it is received)",
        "When simple implementation is desired",
      ],
      prosAndCons: {
        pros: [
          "Simple implementation",
          "Efficient for small data sets",
          "Adaptive algorithm",
          "Stable sorting algorithm",
        ],
        cons: [
          "Quadratic time complexity",
          "Not suitable for large datasets",
          "Requires shifting elements",
        ],
      },
    },
    selection: {
      title: "Selection Sort",
      complexity: {
        "Time (Best)": "O(n²)",
        "Time (Average)": "O(n²)",
        "Time (Worst)": "O(n²)",
        Space: "O(1)",
      },
      description:
        "Selection Sort divides the input list into two parts: sorted and unsorted. It repeatedly selects the smallest element from the unsorted portion and adds it to the sorted portion.",
      code: `function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return arr;
}`,
      useCases: [
        "Small lists",
        "When memory space is limited",
        "When simplicity is required",
        "When number of writes needs to be minimized",
      ],
      prosAndCons: {
        pros: [
          "Simple to implement",
          "Minimal memory usage",
          "Minimal number of swaps",
          "Performs well on small lists",
        ],
        cons: [
          "O(n²) complexity makes it inefficient for large lists",
          "Not stable",
          "Does not adapt to the data",
        ],
      },
    },
    quick: {
      title: "Quick Sort",
      complexity: {
        "Time (Best)": "O(n log n)",
        "Time (Average)": "O(n log n)",
        "Time (Worst)": "O(n²)",
        Space: "O(log n)",
      },
      description:
        "QuickSort uses a divide-and-conquer strategy. It picks a 'pivot' element and partitions the array around it, such that smaller elements move to the left and larger elements to the right.",
      code: `function quickSort(arr) {
  if (arr.length <= 1) return arr;
  
  const pivot = arr[arr.length - 1];
  const left = [], right = [];
  
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  
  return [...quickSort(left), pivot, ...quickSort(right)];
}`,
      useCases: [
        "Large datasets",
        "When average case performance matters",
        "Systems with good cache locality",
        "When in-place sorting is needed",
      ],
      prosAndCons: {
        pros: [
          "Excellent average case performance",
          "In-place sorting possible",
          "Cache friendly",
          "Very fast in practice",
        ],
        cons: [
          "Unstable sorting algorithm",
          "Poor worst-case performance",
          "Not adaptive",
          "Complex implementation for optimal performance",
        ],
      },
    },
    merge: {
      title: "Merge Sort",
      complexity: {
        "Time (Best)": "O(n log n)",
        "Time (Average)": "O(n log n)",
        "Time (Worst)": "O(n log n)",
        Space: "O(n)",
      },
      description:
        "Merge Sort uses the divide-and-conquer approach. It divides the array into two halves, recursively sorts them, and then merges the sorted halves to create a fully sorted array.",
      code: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  return result
    .concat(left.slice(leftIndex))
    .concat(right.slice(rightIndex));
}`,
      useCases: [
        "When stable sorting is required",
        "When guaranteed O(n log n) performance is needed",
        "External sorting",
        "Linked list sorting",
      ],
      prosAndCons: {
        pros: [
          "Stable sorting algorithm",
          "Guaranteed O(n log n) performance",
          "Parallelizable",
          "Works well with linked lists",
        ],
        cons: [
          "Requires O(n) extra space",
          "Not in-place",
          "Not adaptive",
          "Overhead for small arrays",
        ],
      },
    },
    heap: {
      title: "Heap Sort",
      complexity: {
        "Time (Best)": "O(n log n)",
        "Time (Average)": "O(n log n)",
        "Time (Worst)": "O(n log n)",
        Space: "O(1)",
      },
      description:
        "Heap Sort builds a heap from the input data and then repeatedly extracts the maximum element from the heap and rebuilds the heap.",
      code: `function heapSort(arr) {
      function heapify(arr, n, i) {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;
    
        if (left < n && arr[left] > arr[largest]) {
          largest = left;
        }
    
        if (right < n && arr[right] > arr[largest]) {
          largest = right;
        }
    
        if (largest !== i) {
          [arr[i], arr[largest]] = [arr[largest], arr[i]];
          heapify(arr, n, largest);
        }
      }
    
      const n = arr.length;
    
      for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
      }
    
      for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapify(arr, i, 0);
      }
    
      return arr;
    }`,
      useCases: [
        "Large datasets",
        "When constant space complexity is required",
        "When a stable sort is not necessary",
      ],
      prosAndCons: {
        pros: [
          "Good time complexity of O(n log n)",
          "In-place sorting algorithm",
          "Not sensitive to the initial order of elements",
        ],
        cons: [
          "Not a stable sort",
          "More complex to implement compared to simpler algorithms like Bubble Sort",
          "Requires random access to the data",
        ],
      },
    },
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6">Sorting Algorithms</h2>
        <p className="text-slate-600 mb-8">
          Explore different sorting algorithms, their implementations, and when
          to use them.
        </p>

        <div className="space-y-4">
          {Object.entries(algorithms).map(([key, algorithm]) => (
            <div key={key} className="border rounded-lg overflow-hidden">
              <button
                className="w-full p-4 text-left bg-white hover:bg-slate-50 flex justify-between items-center"
                onClick={() =>
                  setOpenAlgorithm(openAlgorithm === key ? null : key)
                }
              >
                <span className="text-xl font-semibold">{algorithm.title}</span>
                <span className="transform transition-transform duration-200">
                  {openAlgorithm === key ? "▼" : "▶"}
                </span>
              </button>
              {openAlgorithm === key && (
                <div className="p-4 bg-slate-50">
                  <SortingAlgorithm {...algorithm} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default About;
