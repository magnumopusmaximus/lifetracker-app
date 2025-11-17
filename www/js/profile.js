// Profile Management
let profileName = localStorage.getItem('profileName') || 'Your Name';
let profilePicture = localStorage.getItem('profilePicture') || null;

function loadProfile() {
    const nameElement = document.querySelector('.profile-name');
    if (nameElement) {
        nameElement.textContent = profileName;
    }
    
    if (profilePicture) {
        const picContent = document.getElementById('profilePicContent');
        if (picContent) {
            picContent.innerHTML = `<img src="${profilePicture}" alt="Profile">`;
        }
    }
}

function setupProfileListeners() {
    const profilePic = document.querySelector('.profile-pic');
    const profileNameEl = document.querySelector('.profile-name');
    
    if (profilePic) {
        profilePic.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            uploadProfilePic();
        }, true);
    }
    
    if (profileNameEl) {
        profileNameEl.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            editProfileName();
        }, true);
    }
}

function editProfileName() {
    const newName = prompt('New name:', profileName);
    if (newName && newName.trim()) {
        profileName = newName.trim();
        localStorage.setItem('profileName', profileName);
        const nameElement = document.querySelector('.profile-name');
        if (nameElement) {
            nameElement.textContent = profileName;
        }
    }
}

function uploadProfilePic() {
    let input = document.getElementById('profilePicInput');
    
    if (!input) {
        input = document.createElement('input');
        input.type = 'file';
        input.id = 'profilePicInput';
        input.accept = 'image/*';
        input.style.display = 'none';
        document.body.appendChild(input);
        input.addEventListener('change', handleImageUpload);
    }
    
    if (input) {
        input.click();
    }
}

function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
        alert('Please select an image file!');
        return;
    }
    
    if (file.size > 10 * 1024 * 1024) {
        alert('Image too large! Max 10MB allowed.');
        return;
    }
    
    const reader = new FileReader();
    reader.onerror = () => alert('Error reading file!');
    reader.onload = (event) => {
        try {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const size = 300;
                canvas.width = size;
                canvas.height = size;
                const ctx = canvas.getContext('2d');
                
                const scale = Math.max(size / img.width, size / img.height);
                const x = (size - img.width * scale) / 2;
                const y = (size - img.height * scale) / 2;
                
                ctx.beginPath();
                ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
                ctx.clip();
                ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
                
                profilePicture = canvas.toDataURL('image/png');
                localStorage.setItem('profilePicture', profilePicture);
                
                const picContent = document.getElementById('profilePicContent');
                if (picContent) {
                    picContent.innerHTML = `<img src="${profilePicture}" alt="Profile">`;
                }
            };
            img.src = event.target.result;
        } catch (error) {
            console.error('Error loading image:', error);
            alert('Error loading image!');
        }
    };
    reader.readAsDataURL(file);
}