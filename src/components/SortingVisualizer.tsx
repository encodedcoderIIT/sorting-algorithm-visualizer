import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Info } from "lucide-react";
import { algorithms } from "../utils/sorting";

const SortingVisualizer: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [arraySize, setArraySize] = useState<number>(8);
  const [algorithm, setAlgorithm] = useState<string>("bubble");
  // const [speed, setSpeed] = useState<number>(50);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [comparisons, setComparisons] = useState<number>(0);
  const [swaps, setSwaps] = useState<number>(0);
  const [comparing, setComparing] = useState<number[]>([]);
  const [swapping, setSwapping] = useState<number[]>([]);
  const [sorted, setSorted] = useState<number[]>([]);

  // Change initial speed to a slower value
  const [speed, setSpeed] = useState<number>(3); // Start with slower speed

  // Modify the delay function for slower speeds
  const delay = (ms: number) => {
    // Adjust base delay (increase for slower speed)
    const baseDelay = 1000; // 1 second base delay
    // Inverse the speed so higher speed value = faster
    const speedFactor = (100 - speed) / 100;
    // Calculate actual delay
    const actualDelay = baseDelay * speedFactor;
    return new Promise((resolve) => setTimeout(resolve, actualDelay));
  };

  const generateRandomArray = useCallback(() => {
    const newArray = Array.from(
      { length: arraySize },
      () => Math.floor(Math.random() * 100) + 1
    );
    setArray(newArray);
    resetStats();
  }, [arraySize]);

  const resetStats = () => {
    setComparisons(0);
    setSwaps(0);
    setSorted([]);
    setComparing([]);
    setSwapping([]);
  };

  useEffect(() => {
    generateRandomArray();
  }, [arraySize, generateRandomArray]);

  // Bubble Sort Implementation
  async function bubbleSort() {
    console.log("Starting bubble sort");
    let arr = [...array];
    const n = arr.length;

    console.log("Initial array:", arr);

    try {
      for (let i = 0; i < n - 1; i++) {
        console.log(`Pass ${i + 1}`);

        for (let j = 0; j < n - i - 1; j++) {
          // Log current comparison
          console.log(
            `Comparing ${arr[j]} and ${arr[j + 1]} at indices ${j} and ${j + 1}`
          );

          // Show comparison visually
          setComparing([j, j + 1]);
          setComparisons((prev) => prev + 1);
          await delay(300);

          if (arr[j] > arr[j + 1]) {
            console.log(`Swapping ${arr[j]} and ${arr[j + 1]}`);

            // Show swap visually
            setSwapping([j, j + 1]);
            await delay(300);

            // Perform swap
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            setArray([...arr]);
            setSwaps((prev) => prev + 1);

            console.log("Array after swap:", arr);
            await delay(300);
          }

          setComparing([]);
          setSwapping([]);
        }

        // Mark element as sorted after each pass
        setSorted((prev) => [...prev, n - 1 - i]);
        console.log(`Pass ${i + 1} completed`);
      }

      // Mark final element as sorted
      setSorted((prev) => [...prev, 0]);
      console.log("Final array:", arr);
    } catch (error) {
      console.error("Error during sort:", error);
    } finally {
      setIsPlaying(false);
    }
  }

  // Quick Sort Implementation
  async function quickSortStart() {
    const arr = [...array]; // Create a local copy of the array
    await quickSort(arr, 0, arr.length - 1);

    async function quickSort(arr: number[], start: number, end: number) {
      if (start >= end) return;

      async function partition(low: number, high: number): Promise<number> {
        const pivot = arr[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
          // Visualize comparison
          setComparing([j, high]);
          setComparisons((prev) => prev + 1);
          await delay(300);

          if (arr[j] < pivot) {
            i++;
            // Visualize swap
            setSwapping([i, j]);
            [arr[i], arr[j]] = [arr[j], arr[i]];
            setArray([...arr]);
            setSwaps((prev) => prev + 1);
            await delay(300);
          }
          setComparing([]);
          setSwapping([]);
        }

        // Place pivot in correct position
        const pivotPos = i + 1;
        setSwapping([pivotPos, high]);
        [arr[pivotPos], arr[high]] = [arr[high], arr[pivotPos]];
        setArray([...arr]);
        setSwaps((prev) => prev + 1);
        await delay(300);
        setSwapping([]);

        // Mark pivot position as sorted
        setSorted((prev) => [...prev, pivotPos]);

        return pivotPos;
      }

      try {
        const pivotIndex = await partition(start, end);
        if (pivotIndex === -1) return; // Sorting was cancelled

        // Sort left and right partitions
        await quickSort(arr, start, pivotIndex - 1);
        await quickSort(arr, pivotIndex + 1, end);

        // Mark full range as sorted when both partitions complete
        if (start === 0 && end === arr.length - 1) {
          setSorted(Array.from({ length: arr.length }, (_, i) => i));
        }
      } catch (error) {
        console.error("Error in quickSort:", error);
        setComparing([]);
        setSwapping([]);
      }
    }
  }

  // Merge Sort Implementation
  async function mergeSortStart() {
    const arr = [...array]; // Create a local copy of the array
    await mergeSort(arr, 0, arr.length - 1);

    async function mergeSort(arr: number[], start: number, end: number) {
      if (start >= end) return;

      async function merge(left: number, mid: number, right: number) {
        const leftArray = arr.slice(left, mid + 1);
        const rightArray = arr.slice(mid + 1, right + 1);
        let i = 0,
          j = 0,
          k = left;

        while (i < leftArray.length && j < rightArray.length) {
          setComparing([left + i, mid + 1 + j]);
          setComparisons((prev) => prev + 1);
          await delay(300);

          if (leftArray[i] <= rightArray[j]) {
            arr[k] = leftArray[i];
            i++;
          } else {
            arr[k] = rightArray[j];
            j++;
          }

          setSwapping([k]);
          setArray([...arr]);
          setSwaps((prev) => prev + 1);
          await delay(300);
          k++;

          setComparing([]);
          setSwapping([]);
        }

        while (i < leftArray.length) {
          arr[k] = leftArray[i];
          setSwapping([k]);
          setArray([...arr]);
          setSwaps((prev) => prev + 1);
          await delay(300);
          i++;
          k++;
          setSwapping([]);
        }

        while (j < rightArray.length) {
          arr[k] = rightArray[j];
          setSwapping([k]);
          setArray([...arr]);
          setSwaps((prev) => prev + 1);
          await delay(300);
          j++;
          k++;
          setSwapping([]);
        }

        for (let idx = left; idx <= right; idx++) {
          setSorted((prev) => [...prev, idx]);
        }
      }

      const mid = Math.floor((start + end) / 2);
      await mergeSort(arr, start, mid);
      await mergeSort(arr, mid + 1, end);
      await merge(start, mid, end);
    }
  }

  // Selection Sort Implementation
  async function selectionSort() {
    let arr = [...array]; // Create a local copy of the array
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;

      for (let j = i + 1; j < n; j++) {
        setComparing([minIdx, j]);
        setComparisons((prev) => prev + 1);
        await delay(300);

        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
        setComparing([]);
      }

      if (minIdx !== i) {
        setSwapping([i, minIdx]);
        await delay(300);
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        setArray([...arr]);
        setSwaps((prev) => prev + 1);
        setSwapping([]);
      }

      setSorted((prev) => [...prev, i]);
    }

    setSorted((prev) => [...prev, n - 1]);
  }

  // Insertion Sort Implementation
  async function insertionSort() {
    let arr = [...array];
    const n = arr.length;

    // Mark first element as sorted
    setSorted([0]);

    for (let i = 1; i < n; i++) {
      const key = arr[i];
      let j = i - 1;

      // Highlight current element to be inserted
      setComparing([i]);
      await delay(300);

      while (j >= 0) {
        // Compare with each element in sorted portion
        setComparing([j, j + 1]);
        setComparisons((prev) => prev + 1);
        await delay(300);

        if (arr[j] > key) {
          // Move elements forward to make space for insertion
          setSwapping([j, j + 1]);
          arr[j + 1] = arr[j];
          setArray([...arr]);
          setSwaps((prev) => prev + 1);
          await delay(300);

          j--;
        } else {
          break;
        }

        setSwapping([]);
      }

      // Place the key in its correct position
      arr[j + 1] = key;
      setArray([...arr]);
      await delay(300);

      // Update sorted portion
      setSorted((prev) => [...prev, i]);
      setComparing([]);
    }

    // Mark all elements as sorted
    setSorted(Array.from({ length: n }, (_, i) => i));
  }

  // Handle Started Sorting
  const handleStartSorting = async () => {
    try {
      if (isPlaying) {
        setIsPlaying(false);
        window.location.reload();
        return;
      }

      setIsPlaying(true);
      resetStats();

      switch (algorithm) {
        case "bubble":
          await bubbleSort();
          break;
        case "quick":
          await quickSortStart();
          break;
        case "merge":
          await mergeSortStart();
          break;
        case "selection":
          await selectionSort();
          break;
        case "insertion": // Add this case
          await insertionSort();
          break;
        default:
          console.log("Algorithm not implemented");
      }
    } catch (error) {
      console.error("Error during sorting:", error);
    } finally {
      setIsPlaying(false);
    }
  };

  // Get Element Color
  const getElementColor = (index: number) => {
    if (comparing.includes(index)) return "bg-yellow-400";
    if (swapping.includes(index)) return "bg-red-400";
    if (sorted.includes(index)) return "bg-green-400";
    return "bg-blue-400";
  };

  //
  return (
    <div className="container mx-auto p-8">
      <div className="space-y-8">
        {/* Controls */}
        <div className="flex gap-4 items-center flex-wrap">
          <Select defaultValue={algorithm} onValueChange={setAlgorithm}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Algorithm" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(algorithms).map(([key, { name }]) => (
                <SelectItem key={key} value={key}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <input
              type="number"
              min="2"
              max="15"
              value={arraySize}
              onChange={(e) => setArraySize(Number(e.target.value))}
              className="w-20 p-2 border rounded"
            />
            <span className="text-sm text-gray-500">Array Size (2-15)</span>
          </div>

          <Button onClick={generateRandomArray}>Generate Random Array</Button>

          <Button
            onClick={handleStartSorting}
            variant={isPlaying ? "destructive" : "default"}
          >
            {isPlaying ? "Stop" : "Start"}
          </Button>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Speed:</span>
            <Slider
              value={[speed]}
              onValueChange={([value]) => setSpeed(value)}
              min={1}
              max={100}
              step={1}
              className="w-32"
            />
          </div>
        </div>

        {/* Debug Info */}
        <div className="text-sm text-gray-500">
          Current Array: [{array.join(", ")}]
        </div>

        {/* Visualization */}
        <div className="flex justify-center gap-4 min-h-[5rem]">
          {array.map((value, index) => (
            <motion.div
              key={index}
              className={`w-16 h-16 flex items-center justify-center text-white rounded-lg ${getElementColor(
                index
              )}`}
              layout
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring" }}
            >
              {value}
            </motion.div>
          ))}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="font-bold">Comparisons</h3>
            <p>{comparisons}</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="font-bold">Swaps</h3>
            <p>{swaps}</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="font-bold">Time Complexity</h3>
            <p>
              {algorithms[algorithm as keyof typeof algorithms].timeComplexity}
            </p>
          </div>
        </div>

        {/* Algorithm Info */}
        <div className="bg-gray-100 p-6 rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="font-bold text-lg">
              {algorithms[algorithm as keyof typeof algorithms].name}
            </h3>
            <Tooltip>
              <TooltipTrigger>
                <Info size={20} />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-md">
                  {algorithms[algorithm as keyof typeof algorithms].description}
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
          <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
            {algorithms[algorithm as keyof typeof algorithms].pseudocode}
          </pre>
        </div>
        {/* Footer */}
      </div>
    </div>
  );
};

export default SortingVisualizer;
