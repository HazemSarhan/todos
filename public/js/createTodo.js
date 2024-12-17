document.addEventListener('DOMContentLoaded', () => {
  const createForm = document.getElementById('create-form');
  const todoInput = document.getElementById('todo-title');

  createForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent traditional form submission

    const title = todoInput.value.trim(); // Get the input value

    if (!title) {
      alert('Please enter a title!');
      return;
    }

    try {
      const response = await fetch('/api/v1/todo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title }),
      });

      if (response.ok) {
        // Reload the page or dynamically add the new item
        window.location.reload();
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to create To Do.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    }
  });
});
