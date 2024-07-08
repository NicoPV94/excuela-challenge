export interface ChartData {
  bar: {
    label: string;
    data: VideoData[];
  }[];
  pie: {
    data: PieChartData[];
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

export interface PieChartData {
  label: string;
  value: number;
}

export interface LineChartData {
  month: string;
  userCount: number;
}
