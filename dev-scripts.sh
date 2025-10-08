#!/bin/bash

# Development scripts for frontend and backend
# Usage:
#   ./dev-scripts.sh init-frontend - Initialize frontend (install dependencies)
#   ./dev-scripts.sh init-backend  - Initialize backend (venv, dependencies, database)
#   ./dev-scripts.sh frontend      - Start frontend only
#   ./dev-scripts.sh backend       - Start backend only
#   ./dev-scripts.sh both          - Start both frontend and backend
#   ./dev-scripts.sh patch         - Updates CHANGELOG.md with notes for patch release
#   ./dev-scripts.sh minor         - Updates CHANGELOG.md with notes for minor release
#   ./dev-scripts.sh major         - Updates CHANGELOG.md with notes for major release

MODE=${1:-"both"}

init_frontend() {
  echo "Initializing frontend..."

  cd frontend || exit 1

  # Install dependencies
  echo "Installing npm dependencies..."
  npm install

  echo ""
  echo "========================================"
  echo "Frontend initialization complete!"
  echo "Run './dev-scripts.sh frontend' to start the server"
  echo "========================================"
}

init_backend() {
  echo "Initializing backend..."

  cd backend || exit 1

  # Create virtual environment if it doesn't exist
  if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
  fi

  # Activate virtual environment
  echo "Activating virtual environment..."
  source venv/bin/activate

  # Install dependencies
  echo "Installing Python dependencies..."
  pip install --upgrade pip
  pip install -r requirements.txt

  # Run database migrations
  if [ -f "alembic.ini" ]; then
    echo "Running database migrations..."
    alembic upgrade head
  fi

  echo ""
  echo "========================================"
  echo "Backend initialization complete!"
  echo "Run './dev-scripts.sh backend' to start the server"
  echo "========================================"
}

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

changelog_patch() {
  echo "updating CHANGELOG.md with patch release notes..."
  cd frontend && npm run changelog:patch
}

changelog_minor() {
  echo "updating CHANGELOG.md with minor release notes..."
  cd frontend && npm run changelog:minor
}

changelog_major() {
  echo "updating CHANGELOG.md with major release notes..."
  cd frontend && npm run changelog:major
}

case $MODE in
  init-frontend)
    init_frontend
    ;;
  init-backend)
    init_backend
    ;;
  frontend)
    start_frontend
    ;;
  backend)
    start_backend
    ;;
  both)
    start_both
    ;;
  patch)
    changelog_patch
    ;;
  minor)
    changelog_minor
    ;;
  major)
    changelog_major
    ;;
  *)
    echo "Usage: $0 [init-frontend|init-backend|frontend|backend|both]"
    exit 1
    ;;
esac
