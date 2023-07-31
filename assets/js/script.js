{
    window.onload = (event) => {
        console.log("page is fully loaded");
    };
    
    function enableUpdateProfile() {
        console.log('hello');
        let v = true;
        const infoDiv = document.getElementById('user-profile-info');
        const infoForm = document.getElementById('user-profile-info-form');
        if (infoDiv.style.visibility == "visible") {
            infoDiv.style.visibility = "hidden";
            infoDiv.style.contentVisibility = "hidden";
            infoForm.style.visibility = "visible";
            infoForm.style.contentVisibility = "visible";
        } else {
            infoDiv.style.visibility = "visible";
            infoDiv.style.contentVisibility = "visible";
            infoForm.style.visibility = "hidden";
            infoForm.style.contentVisibility = "hidden";
        }
    }
}