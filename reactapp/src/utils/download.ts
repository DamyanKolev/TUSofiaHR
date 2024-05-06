export async function downloadFile(fetchURL:string, filename: string, fileType: string) {
    const token = sessionStorage.getItem("accessToken")
    const response = await fetch(fetchURL, {
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
    })

    if (response.ok) {
        const blob = await response.blob()
        //Create a Blob from the PDF Stream
        // const file = new Blob([blob], { type: "application/pdf" });
        const file = new Blob([blob], { type: fileType });
        //Build a URL from the file
        const fileURL = URL.createObjectURL(file);
        //Open the URL on new Window
        // const pdfWindow = window.open();
        // if(pdfWindow) {
        //     pdfWindow.location.href = fileURL;
        // }
        // else(
        //     console.error("Window is null")
        // )
        // console.log(filename)

        const link = document.createElement('a');
        link.href = fileURL;
        link.download = filename
        // Append to html link element page
        document.body.appendChild(link);
        // Start download
        link.click();
        // Clean up and remove the link
        if(link.parentElement != null) {
            link.parentElement.removeChild(link);
        }
        else(
            console.error("link does not have a parent")
        )
    }
    else {
        console.error(await response.json())
    }
}


