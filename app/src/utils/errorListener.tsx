import React from 'react';

interface State {
  hasError: boolean;
  errorMessage: Error | null;
}

class ErrorListener extends React.Component<any, State> {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: null,
    };
  }

  static getDerivedStateFromError(error: TypeError) {
    console.error(error);
    return {
      hasError: true,
      errorMessage: error,
    };
  }

  render() {
    const { hasError, errorMessage } = this.state;

    if (hasError)
      return (
        <div className="errorPage">
          {errorMessage?.name}:{errorMessage?.message}<br />
          {errorMessage?.stack}
        </div>
      );

    return this.props.children;
  }
}

export default ErrorListener;
