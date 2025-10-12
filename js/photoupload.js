document.addEventListener('DOMContentLoaded', function() {
    // Находим все блоки загрузки фото на странице
    const photoUploadBlocks = document.querySelectorAll('.js-field-photo-upload');
    
    // Обработчик для кнопки добавления фото
    document.querySelectorAll('.js-photo-button-attach').forEach(button => {
        button.addEventListener('click', function() {
            const uploadBlock = this.closest('.js-field-photo-upload');
            const fileInput = uploadBlock.querySelector('.js-field-input');
            fileInput.click();
        });
    });
    
    // Обработчик для выбора файла
    document.querySelectorAll('.js-field-input').forEach(input => {
        input.addEventListener('change', function() {
            const uploadBlock = this.closest('.js-field-photo-upload');
            const file = this.files[0];
            
            if (file && isValidFileType(file)) {
                handleFileSelection(uploadBlock, file, this);
            }
        });
        
        // Ограничиваем типы файлов только JPG и PNG
        input.setAttribute('accept', 'image/jpeg,image/png,.jpg,.jpeg,.png');
    });
    
    // Обработчик для кнопки удаления фото
    document.querySelectorAll('.js-photo-button-del').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const uploadBlock = this.closest('.js-field-photo-upload');
            clearPhotoSelection(uploadBlock);
        });
    });
    
    // Функция проверки типа файла
    function isValidFileType(file) {
        const validTypes = ['image/jpeg', 'image/png'];
        return validTypes.includes(file.type);
    }
    
    // Функция обработки выбранного файла
    function handleFileSelection(uploadBlock, file, input) {
        const photoContainer = uploadBlock.querySelector('.file-photo-upload');
        
        // Создаем объект FileReader для чтения файла
        const reader = new FileReader();
        
        reader.onload = function(e) {
            // Очищаем контейнер перед добавлением нового изображения
            photoContainer.innerHTML = '';
            
            // Создаем элемент img
            const img = document.createElement('img');
            img.src = e.target.result;
            img.alt = 'Загруженное фото';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            
            // Добавляем изображение в контейнер
            photoContainer.appendChild(img);
            
            // Добавляем класс photo-active
            uploadBlock.classList.add('photo-active');
        };
        
        // Читаем файл как Data URL
        reader.readAsDataURL(file);
    }
    
    // Функция очистки выбранного фото
    function clearPhotoSelection(uploadBlock) {
        const input = uploadBlock.querySelector('.js-field-input');
        const photoContainer = uploadBlock.querySelector('.file-photo-upload');
        
        // Очищаем input
        input.value = '';
        
        // Очищаем контейнер с фото
        photoContainer.innerHTML = '';
        
        // Удаляем класс photo-active
        uploadBlock.classList.remove('photo-active');
    }
});