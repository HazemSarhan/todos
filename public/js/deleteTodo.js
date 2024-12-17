document.addEventListener('DOMContentLoaded', () => {
  // DELETE Button Logic
  const deleteButtons = document.querySelectorAll('.delete-btn');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      const todoId = button.getAttribute('data-id');

      if (confirm('Are you sure you want to delete this To Do?')) {
        try {
          const response = await fetch(`/api/v1/todo/${todoId}`, {
            method: 'DELETE',
          });
          if (response.ok) {
            window.location.reload();
          } else {
            alert('Failed to delete the To Do.');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('An error occurred.');
        }
      }
    });
  });
});
