export interface ChartData {
  bar: {
    label: string;
    data: VideoData[];
  }[];
  pie: {
    data: number[];
    label: string;
  }[];
  line: {
    label: string;
    data: LineChartData[];
  }[];
}

export interface VideoData {
  name: string;
  category: string;
  videoMinutes: number;
  id: number;
}

export interface LineChartData {
  month: string;
  userCount: number;
}
