"use client";

import React, { Component, useEffect, useState } from "react";
import { isWebGLAvailable } from "@/lib/utils";

interface ErrorBoundaryProps {
  fallback: React.ReactNode;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class CanvasErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

interface WebGLBoundaryProps {
  fallback: React.ReactNode;
  children: React.ReactNode;
}

export function WebGLBoundary({ fallback, children }: WebGLBoundaryProps) {
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    setSupported(isWebGLAvailable());
  }, []);

  if (supported === null) {
    return <>{fallback}</>;
  }

  if (!supported) {
    return <>{fallback}</>;
  }

  return (
    <CanvasErrorBoundary fallback={fallback}>{children}</CanvasErrorBoundary>
  );
}
