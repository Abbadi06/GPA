document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const coursesContainer = document.getElementById('coursesContainer');
    const addCourseBtn = document.getElementById('addCourseBtn');
    const calculateBtn = document.getElementById('calculateBtn');
    const currentGPAInput = document.getElementById('currentGPA');
    const totalCreditsInput = document.getElementById('totalCredits');
    const currentGPAOutput = document.getElementById('currentGPAOutput');
    const newGPAOutput = document.getElementById('newGPAOutput');
    const totalCreditsOutput = document.getElementById('totalCreditsOutput');

    // Add course fields
    function addCourseFields() {
        const courseDiv = document.createElement('div');
        courseDiv.className = 'course-item mb-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200';
        courseDiv.innerHTML = `
            <div class="flex justify-between items-center mb-2">
                <h3 class="font-medium text-gray-700">Course</h3>
                <button class="remove-course text-red-500 hover:text-red-700">
                    <i data-feather="trash-2" class="w-4 h-4"></i>
                </button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm text-gray-500 mb-1">Grade</label>
                    <select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary">
                        <option value="4">A (4.0)</option>
                        <option value="3.7">A- (3.7)</option>
                        <option value="3.3">B+ (3.3)</option>
                        <option value="3">B (3.0)</option>
                        <option value="2.7">B- (2.7)</option>
                        <option value="2.3">C+ (2.3)</option>
                        <option value="2">C (2.0)</option>
                        <option value="1.7">C- (1.7)</option>
                        <option value="1.3">D+ (1.3)</option>
                        <option value="1">D (1.0)</option>
                        <option value="0">F (0.0)</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm text-gray-500 mb-1">Credits</label>
                    <input type="number" min="1" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary" value="3">
                </div>
            </div>
        `;
        coursesContainer.appendChild(courseDiv);
        feather.replace();
        
        // Add event listener to remove button
        const removeBtn = courseDiv.querySelector('.remove-course');
        removeBtn.addEventListener('click', () => {
            courseDiv.remove();
        });
    }

    // Calculate GPA
    function calculateGPA() {
        // Get current GPA and credits
        const currentGPA = parseFloat(currentGPAInput.value) || 0;
        const currentCredits = parseInt(totalCreditsInput.value) || 0;
        
        // Calculate new courses
        const courseItems = document.querySelectorAll('.course-item');
        let totalGradePoints = currentGPA * currentCredits;
        let totalNewCredits = currentCredits;
        
        courseItems.forEach(item => {
            const grade = parseFloat(item.querySelector('select').value);
            const credits = parseInt(item.querySelector('input[type="number"]').value);
            
            totalGradePoints += grade * credits;
            totalNewCredits += credits;
        });
        
        // Calculate new GPA
        const newGPA = totalNewCredits > 0 ? totalGradePoints / totalNewCredits : 0;
        
        // Update results
        currentGPAOutput.textContent = currentGPA.toFixed(2);
        newGPAOutput.textContent = newGPA.toFixed(2);
        totalCreditsOutput.textContent = totalNewCredits;
    }

    // Event Listeners
    addCourseBtn.addEventListener('click', addCourseFields);
    calculateBtn.addEventListener('click', calculateGPA);

    // Add initial course
    addCourseFields();
});