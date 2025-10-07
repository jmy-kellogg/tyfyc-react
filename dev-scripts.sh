#!/bin/bash

# Start frontend and/or backend development servers
# Usage:
#   ./start-dev.sh          - Start both frontend and backend
#   ./start-dev.sh frontend - Start frontend only
#   ./start-dev.sh backend  - Start backend only

MODE=${1:-"both"}

start_backend() {
  echo "Starting backend development server..."
  cd backend && source venv/bin/activate && python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
}

start_frontend() {
  echo "Starting frontend development server..."
  cd frontend && npm run dev
}

start_both() {
  echo "Starting development servers..."

  # Trap Ctrl+C to kill both processes
  trap 'kill $(jobs -p); exit' INT TERM

  # Start backend
  echo "Starting backend server..."
  cd backend && source venv/bin/activate && python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000 &
  BACKEND_PID=$!

  # Wait a moment for backend to start
  sleep 2

  # Start frontend
  echo "Starting frontend server..."
  cd frontend && npm run dev &
  FRONTEND_PID=$!

  echo ""
  echo "========================================"
  echo "Development servers started:"
  echo "  Backend:  http://localhost:8000"
  echo "  Frontend: http://localhost:5173"
  echo "========================================"
  echo ""
  echo "Press Ctrl+C to stop both servers"

  # Wait for both processes
  wait $BACKEND_PID $FRONTEND_PID
}

case $MODE in
  frontend)
    start_frontend
    ;;
  backend)
    start_backend
    ;;
  both)
    start_both
    ;;
  *)
    echo "Usage: $0 [frontend|backend|both]"
    exit 1
    ;;
esac
