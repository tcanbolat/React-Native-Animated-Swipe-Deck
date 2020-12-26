// HELPER FUNCTION TO CHECK OF USER IS CLICKING OR DRAGGING THE DECK
// IF WITHIN RANGE, PAN-HANDLER TAKES OVER AND INITIATES THE DRAG ANIMATION
// IF NOT, THEN THE PAN-HANDLER DOES NOT INITIATE.
// WITHOUT THIS, onPRESS TOUCH EVENTS WONT REGISTER ON THE ANIMATED DECK.
const handleDragRange = ({ dx, dy }) => {
  const draggedDown = dy > 5;
  const draggedUp = dy < -5;
  const draggedLeft = dx < -5;
  const draggedRight = dx > 5;

  if (draggedDown || draggedUp) {
    if (draggedDown) return true;
    if (draggedUp) return true;
  }
  if (draggedLeft || draggedRight) {
    if (draggedLeft) return true;
    if (draggedRight) return true;
  } else {
    return false;
  }
};

export default handleDragRange;
