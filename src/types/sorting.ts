export interface Algorithm {
  name: string;
  timeComplexity: string;
  spaceComplexity: string;
  description: string;
  pseudocode: string;
}

export interface SortingStep {
  array: number[];
  comparing: number[];
  swapping: number[];
  sorted: number[];
}

export interface SortingState {
  array: number[];
  comparing: number[];
  swapping: number[];
  sorted: number[];
  comparisons: number;
  swaps: number;
}

export type SortingFunction = (
  array: number[],
  setArray: (arr: number[]) => void,
  setComparing: (indices: number[]) => void,
  setSwapping: (indices: number[]) => void,
  setSorted: (indices: number[]) => void,
  delay: number
) => Promise<void>;

export interface SortingControls {
  isPlaying: boolean;
  speed: number;
  onSpeedChange: (speed: number) => void;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onStep: () => void;
}
