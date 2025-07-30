export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdDate: string;
}

export interface CreateTaskDto {
  title: string;
  description: string;
  completed: boolean;
  createdDate: string;
}
