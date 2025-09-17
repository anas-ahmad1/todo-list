"use client";

import { FC } from "react";

export interface EmptyStateProps {
  message: string;
  subMessage: string;
}

const EmptyState: FC<EmptyStateProps> = ({ message, subMessage }) => (
  <div className="text-center py-12">
    <div className="text-gray-400 text-lg">{message}</div>
    <div className="text-gray-500 text-sm mt-1">{subMessage}</div>
  </div>
);

export default EmptyState;
