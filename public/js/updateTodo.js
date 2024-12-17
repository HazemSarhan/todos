const updateButtons = document.querySelectorAll('.update-btn');
updateButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    const todoId = button.getAttribute('data-id');

    try {
      const response = await fetch(`/api/v1/todo/${todoId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: true }),
      });
      if (response.ok) {
        window.location.reload();
      } else {
        alert('Failed to update the To Do.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred.');
    }
  });
});
