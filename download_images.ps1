# PowerShell script to download placeholder images for TENTFLAIR SOLUTIONS website
Write-Host "Downloading placeholder images for TENTFLAIR SOLUTIONS website..."

# Create the images directory if it doesn't exist
$imagesDir = "c:\Users\mukud\Documents\TENTFLAIR\images"
if (-not (Test-Path $imagesDir)) {
    New-Item -ItemType Directory -Path $imagesDir | Out-Null
}

# Function to download an image
function Download-Image {
    param (
        [string]$url,
        [string]$outputFile
    )
    
    $fullPath = Join-Path $imagesDir $outputFile
    
    try {
        Write-Host "Downloading $outputFile..."
        Invoke-WebRequest -Uri $url -OutFile $fullPath
    }
    catch {
        Write-Host "Failed to download $outputFile : $_"
    }
}

# Download hero background
Download-Image -url "https://images.pexels.com/photos/1797428/pexels-photo-1797428.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" -outputFile "hero-background.jpg"

# Download product images
Download-Image -url "https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" -outputFile "pvc-tents.jpg"
Download-Image -url "https://images.pexels.com/photos/93398/pexels-photo-93398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" -outputFile "truck-covers.jpg"
Download-Image -url "https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" -outputFile "tautliners.jpg"
Download-Image -url "https://images.pexels.com/photos/2659172/pexels-photo-2659172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" -outputFile "tipper-covers.jpg"
Download-Image -url "https://images.pexels.com/photos/1769279/pexels-photo-1769279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" -outputFile "chicken-curtains.jpg"
Download-Image -url "https://images.pexels.com/photos/261041/pexels-photo-261041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" -outputFile "pool-covers.jpg"

# Download larger product images
Download-Image -url "https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" -outputFile "pvc-tents-large.jpg"
Download-Image -url "https://images.pexels.com/photos/93398/pexels-photo-93398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" -outputFile "truck-covers-large.jpg"
Download-Image -url "https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" -outputFile "tautliners-large.jpg"
Download-Image -url "https://images.pexels.com/photos/2659172/pexels-photo-2659172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" -outputFile "tipper-covers-large.jpg"
Download-Image -url "https://images.pexels.com/photos/1769279/pexels-photo-1769279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" -outputFile "chicken-curtains-large.jpg"
Download-Image -url "https://images.pexels.com/photos/261041/pexels-photo-261041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" -outputFile "pool-covers-large.jpg"

# Download thumbnails
Download-Image -url "https://images.pexels.com/photos/2422461/pexels-photo-2422461.jpeg?auto=compress&cs=tinysrgb&w=400" -outputFile "pvc-tents-thumb1.jpg"
Download-Image -url "https://images.pexels.com/photos/2917442/pexels-photo-2917442.jpeg?auto=compress&cs=tinysrgb&w=400" -outputFile "pvc-tents-thumb2.jpg"
Download-Image -url "https://images.pexels.com/photos/2917447/pexels-photo-2917447.jpeg?auto=compress&cs=tinysrgb&w=400" -outputFile "pvc-tents-thumb3.jpg"

Download-Image -url "https://images.pexels.com/photos/3183960/pexels-photo-3183960.jpeg?auto=compress&cs=tinysrgb&w=400" -outputFile "truck-covers-thumb1.jpg"
Download-Image -url "https://images.pexels.com/photos/4320544/pexels-photo-4320544.jpeg?auto=compress&cs=tinysrgb&w=400" -outputFile "truck-covers-thumb2.jpg"
Download-Image -url "https://images.pexels.com/photos/4602155/pexels-photo-4602155.jpeg?auto=compress&cs=tinysrgb&w=400" -outputFile "truck-covers-thumb3.jpg"

Download-Image -url "https://images.pexels.com/photos/5025512/pexels-photo-5025512.jpeg?auto=compress&cs=tinysrgb&w=400" -outputFile "tautliners-thumb1.jpg"
Download-Image -url "https://images.pexels.com/photos/797793/pexels-photo-797793.jpeg?auto=compress&cs=tinysrgb&w=400" -outputFile "tautliners-thumb2.jpg"
Download-Image -url "https://images.pexels.com/photos/2223082/pexels-photo-2223082.jpeg?auto=compress&cs=tinysrgb&w=400" -outputFile "tautliners-thumb3.jpg"

Download-Image -url "https://images.pexels.com/photos/162534/people-build-construction-site-162534.jpeg?auto=compress&cs=tinysrgb&w=400" -outputFile "tipper-covers-thumb1.jpg"
Download-Image -url "https://images.pexels.com/photos/158296/construction-site-build-construction-work-158296.jpeg?auto=compress&cs=tinysrgb&w=400" -outputFile "tipper-covers-thumb2.jpg"
Download-Image -url "https://images.pexels.com/photos/2659172/pexels-photo-2659172.jpeg?auto=compress&cs=tinysrgb&w=400" -outputFile "tipper-covers-thumb3.jpg"

Download-Image -url "https://images.pexels.com/photos/6205509/pexels-photo-6205509.jpeg?auto=compress&cs=tinysrgb&w=400" -outputFile "chicken-curtains-thumb1.jpg"
Download-Image -url "https://images.pexels.com/photos/103887/pexels-photo-103887.jpeg?auto=compress&cs=tinysrgb&w=400" -outputFile "chicken-curtains-thumb2.jpg"
Download-Image -url "https://images.pexels.com/photos/162517/wing-animal-poultry-siegburg-162517.jpeg?auto=compress&cs=tinysrgb&w=400" -outputFile "chicken-curtains-thumb3.jpg"

Download-Image -url "https://images.pexels.com/photos/53209/pool-water-swimming-relaxing-53209.jpeg?auto=compress&cs=tinysrgb&w=400" -outputFile "pool-covers-thumb1.jpg"
Download-Image -url "https://images.pexels.com/photos/261327/pexels-photo-261327.jpeg?auto=compress&cs=tinysrgb&w=400" -outputFile "pool-covers-thumb2.jpg"
Download-Image -url "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=400" -outputFile "pool-covers-thumb3.jpg"

# Download about and team images
Download-Image -url "https://images.pexels.com/photos/8111991/pexels-photo-8111991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" -outputFile "about-company.jpg"
Download-Image -url "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400" -outputFile "team1.jpg"
Download-Image -url "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400" -outputFile "team2.jpg"
Download-Image -url "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400" -outputFile "team3.jpg"
Download-Image -url "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400" -outputFile "team4.jpg"

# Download testimonial images
Download-Image -url "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400" -outputFile "testimonial1.jpg"
Download-Image -url "https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg?auto=compress&cs=tinysrgb&w=400" -outputFile "testimonial2.jpg"
Download-Image -url "https://images.pexels.com/photos/834863/pexels-photo-834863.jpeg?auto=compress&cs=tinysrgb&w=400" -outputFile "testimonial3.jpg"
Download-Image -url "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400" -outputFile "testimonial4.jpg"
Download-Image -url "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=400" -outputFile "testimonial5.jpg"

Write-Host "All images downloaded successfully!"
Write-Host "Note: These are placeholder images from Pexels. For a production website, use actual product photos."
