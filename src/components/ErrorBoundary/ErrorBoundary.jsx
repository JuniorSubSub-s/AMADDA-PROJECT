import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.log('Error caught in ErrorBoundary: ', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <div>Something went wrong while loading the page.</div>
        }
        return this.props.children;
    }
}

export default ErrorBoundary;