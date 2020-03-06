
// PROCESS IMAGE URL
// This creates an image file from the url, resizes it, and then crops it. 
const processImage = (index, image) => new Promise(async (resolve, reject) => {
    const filename = `${index}.png`
    const mimeType = 'image/jpeg'
    const proxyURL = 'https://mighty-waters-78900.herokuapp.com/' // my implementation of cors-anywhere

    const file = await urlToFile(image, filename, mimeType, proxyURL)
    const imageEl = await resizeCropImage(file, index)

    resolve(imageEl)
})

const urlToFile = (url, filename, mimeType, proxyURL = '') =>  new Promise(async (resolve, reject) => {
    mimeType = mimeType || (url.match(/^data:([^;]+);/) || '')[1]
    const response = await fetch(proxyURL + url)
    // alert('UTF Response: ', response)
    const buf = await response.arrayBuffer()
    // console.log('UTF Buffer: ', buf)
    const file = new File([buf], filename, { type: mimeType })
    // console.log('UTF File: ', file)
    resolve(file)
})

const resizeCropImage = (file, index) => {
    const maxWidth = 352
    const maxHeight = 352
    const reader = new FileReader()
    const image = new Image()
    const canvasResize = document.createElement('canvas')

    const resizeCrop = () => new Promise((resolve, reject) => {
        let width = image.width
        let height = image.height
        if (width > height) {
            if (width > maxWidth) {
            height *= maxWidth / width
            width = maxWidth
            }
        } else {
            if (height > maxHeight) {
            width *= maxHeight / height
            height = maxHeight
            }
        }

        // Calculate cover dimensions
        const widthCalc = maxWidth - width
        const heightCalc = maxHeight - height
        let coverWidth = 0
        let coverHeight = 0
        let xOffset = 0
        let yOffset = 0

        if (widthCalc > heightCalc) {
            coverWidth = width + widthCalc
            coverHeight = height + widthCalc
        } else if (heightCalc > widthCalc) {
            coverWidth = width + heightCalc
            coverHeight = height + heightCalc
        } else {
            coverWidth = maxWidth
            coverHeight = maxHeight
        }

        // calculate offset - if widthe is longer than maxSize
        if (coverWidth > maxWidth) {
            xOffset = (maxWidth - coverWidth) / 2
        }
        
        // Resize
        canvasResize.width = width
        canvasResize.height = height
        canvasResize.getContext('2d').drawImage(image, 0, 0, width, height)
        const resizedDataUrl = canvasResize.toDataURL('image/png')

        const resizedImageEl = new Image()
        resizedImageEl.onload = () => {
            // Crop
            const canvasCrop = document.createElement('canvas')
            canvasCrop.width = 352
            canvasCrop.height = 352
            canvasCrop.getContext('2d').drawImage(resizedImageEl, 0 + xOffset, 0 + yOffset, coverWidth, coverHeight)
    
            const croppedDataUrl = canvasCrop.toDataURL('image/png')
        
            const croppedImageEl = new Image()
            croppedImageEl.onload = () => {
                resolve(croppedImageEl)
            }
            croppedImageEl.src = croppedDataUrl
        }
        resizedImageEl.src = resizedDataUrl
    })

    return new Promise((resolve, reject) => {
        if (!file.type.match(/image.*/)) {
            reject(new Error('Not an image'))
            return
        }
        reader.onload = (readerEvent) => {
            image.onload = async () => {
                const processedImageEl = await resizeCrop()
                // console.log('resize: ', data)
                resolve(processedImageEl)
            }
                image.src = readerEvent.target.result
        }
            reader.readAsDataURL(file)
    })
}



// GENERATE TOP NINE 
const generateTopNine = async (images) => {
    const canvasEl = document.createElement('canvas')
    canvasEl.width = 1080
    canvasEl.height = 1080
    const canvasElctx = canvasEl.getContext('2d')

    // Add baseCoordinates to images
    const baseCoordinates = [
      { x: 6, y: 6 },
      { x: 364, y: 6 },
      { x: 722, y: 6 },
      { x: 6, y: 364 },
      { x: 364, y: 364 },
      { x: 722, y: 364 },
      { x: 6, y: 722 },
      { x: 364, y: 722 },
      { x: 722, y: 722 }
    ]

    let data = []

    images.forEach((item, index) => {
        data.push({...item, x: baseCoordinates[index].x, y: baseCoordinates[index].y})
    })

    // Render background
    await renderBackground(canvasElctx)

    // Images
    for (let i = 0; i < data.length; i++) {
        await renderImage(data[i], canvasElctx)
    }

    // Logo
    await renderLogo(canvasElctx)

    // Final
    downloadFinalImage(canvasEl)
}

const renderBackground = (ctx) => new Promise((resolve, reject) => {
      const backgroundImage = new Image()
      backgroundImage.onload = () => {
        ctx.drawImage(backgroundImage, 0, 0)
        resolve()
      }
      backgroundImage.src = '../images/background.png' // '../images/background.png'
    })

const renderLogo = (ctx) => new Promise((resolve, reject) => {
      const logoImage = new Image()
      logoImage.onload = () => {
        ctx.drawImage(logoImage, 665, 995)
        resolve()
      }
      logoImage.src = '../images/pm-banner-top9.png' // '../images/pm-banner-top9.png'
    })

const renderImage = (data, ctx) => new Promise((resolve, reject) => {
        ctx.drawImage(data.image, data.x, data.y)
        resolve()
    })

const downloadFinalImage = async (canvas) => {
    const finalImage = canvas.toDataURL('image/png')
    const blob = await (await fetch(finalImage)).blob()
    const url = (window.webkitURL || window.URL).createObjectURL(blob)

    const link = document.createElement('a')
    link.download = 'topnine.png'
    link.href = url
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

export { processImage, generateTopNine }