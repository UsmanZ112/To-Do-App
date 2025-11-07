
        $(document).ready(function () {
            displaydata();
            $('#add-task').on('click', function () {
                $('.modal').css('display', 'block');

            });
            $('.close-modal').on('click', function () {
                $('.modal').css('display', 'none');
            });

            $('#task-form').submit(function (event) {
                event.preventDefault();
                const title = $('#title').val();
                const description = $('#description').val();
                const status = $('#status').val();

                let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

                const newtask = {
                    title: title,
                    description: description,
                    status: status
                };
                if (title === ''|| description ==='') {
                    alert('please complete task details')
                }
                else {
                    tasks.push(newtask);
                    localStorage.setItem('tasks', JSON.stringify(tasks));
                    $('.modal').css('display', 'none');
                    setTimeout(() => {
                        alert('Saved Successfully');
                    }, 200);
                }
            });


            function displaydata() {
                const tableBody = $('#table-body');
                tableBody.empty();
                let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
              const rows = $.map(tasks, function (task) {
    let statusClass = '';
    if (task.status === 'todo') statusClass = 'status-todo';
    else if (task.status === 'doing') statusClass = 'status-doing';
    else if (task.status === 'complete') statusClass = 'status-complete';
    let selectedTodo = task.status === 'todo' ? 'selected' : '';
    let selectedDoing = task.status === 'doing' ? 'selected' : '';
    let selectedComplete = task.status === 'complete' ? 'selected' : '';
    let selectedDefault = (!task.status || task.status === '') ? 'selected' : '';
    return `
      <tr>
        <td>${task.title}</td>
        <td>${task.description}</td>
        <td class="${statusClass}">${task.status || 'Ready for work'}</td>
        <td>
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
          <select class="status-select">
            <option value="" ${selectedDefault} hidden>Ready for work</option>
            <option value="todo" ${selectedTodo}>To-do</option>
            <option value="doing" ${selectedDoing}>Doing</option>
            <option value="complete" ${selectedComplete}>Completed</option>
          </select>
        </td>
      </tr>
    `;
});
                tableBody.append(rows.join(''));
            }
            $('#table-body').on('click', '.delete-btn', function () {
                let text = "Do you want to Delete this record ?";
                if (confirm(text)) {
                    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
                    const rowIndex = $(this).closest('tr').index();
                    tasks.splice(rowIndex, 1);
                    localStorage.setItem('tasks', JSON.stringify(tasks));
                    displaydata();
                }

            });
              let editindex = null ;
            $('#table-body').on('click', '.edit-btn', function () {
                let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
                const rowindex = $(this).closest('tr').index();
                const tasktoedit = tasks[rowindex];
                $('#edittitle').val(tasktoedit.title);
                $('#editdescription').val(tasktoedit.description);
                $('#editstatus').val(tasktoedit.status);
                $('#editmodal-form').css('display', 'block');
                   $('.editclose-modal').on('click', function () {
                $('.edit-modal').css('display', 'none');
            });

                editindex=rowindex;
            });
            $('#edittask-form').submit(function (event) {
                event.preventDefault;
                const newtitle = $('#edittitle').val();
                const newdescription = $('#editdescription').val();
                const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

                tasks[editindex].title=newtitle;
                tasks[editindex].description=newdescription;

                localStorage.setItem('tasks',JSON.stringify(tasks));

                $('#edit-modal').css('display','none');
                displaydata();
            });

             $('#table-body').on('change', '.status-select', function () {
                let oldstatus= $(this).closest('tr').find('td:nth-child(3)').text();
                  const changestatus =$(this).val();
                let text=`Do you want to change the Status from ${oldstatus} to ${changestatus}?`;
                if(confirm(text)){
                let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
                const rowindex = $(this).closest('tr').index();
                tasks[rowindex].status=changestatus;
                localStorage.setItem('tasks',JSON.stringify(tasks));
                 $(this).closest('tr').find('td:nth-child(3)').text(changestatus);
                 
                 displaydata();
                }
             });
            

        });
    