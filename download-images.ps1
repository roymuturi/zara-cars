$ErrorActionPreference = 'Continue'

# Image URLs from Gybird.co.ke, Cars45.co.ke, and PeachCars.co.ke
# Format: make|label|url

$downloads = @(
    # Toyota - Harrier gallery from Gybird
    @('toyota', 'front', 'https://gybird.co.ke/site/images/car_images/2-1787208146.jpg')
    @('toyota', 'side', 'https://gybird.co.ke/site/images/car_images/3-6a86a1d2a4ab4.jpg')
    @('toyota', 'rear', 'https://gybird.co.ke/site/images/car_images/4-6a86a1d2a4f8c.jpg')
    @('toyota', 'cabin', 'https://gybird.co.ke/site/images/car_images/5-6a86a1d2a5241.jpg')

    # Subaru - Forester from Gybird
    @('subaru', 'front', 'https://gybird.co.ke/site/images/car_images/untitled-design-1787748942.png')
    @('subaru', 'side', 'https://gybird.co.ke/site/images/car_images/untitled-design-1781013725.png')
    @('subaru', 'rear', 'https://gybird.co.ke/site/images/car_images/untitled-design-1787748942.png')
    @('subaru', 'cabin', 'https://gybird.co.ke/site/images/car_images/untitled-design-1781013725.png')

    # Mazda - CX-5 from Gybird
    @('mazda', 'front', 'https://gybird.co.ke/site/images/car_images/untitled-design-1787814490.png')
    @('mazda', 'side', 'https://gybird.co.ke/site/images/car_images/untitled-design-1787650044.png')
    @('mazda', 'rear', 'https://gybird.co.ke/site/images/car_images/untitled-design-1787814490.png')
    @('mazda', 'cabin', 'https://gybird.co.ke/site/images/car_images/untitled-design-1787650044.png')

    # Nissan - X-Trail from Gybird
    @('nissan', 'front', 'https://gybird.co.ke/site/images/car_images/untitled-design-1787573118.png')
    @('nissan', 'side', 'https://gybird.co.ke/site/images/car_images/untitled-design-1787573118.png')
    @('nissan', 'rear', 'https://gybird.co.ke/site/images/car_images/untitled-design-1787573118.png')
    @('nissan', 'cabin', 'https://gybird.co.ke/site/images/car_images/untitled-design-1787311573.png')

    # Volkswagen - Tiguan from Gybird
    @('volkswagen', 'front', 'https://gybird.co.ke/site/images/car_images/untitled-design-1782982920.png')
    @('volkswagen', 'side', 'https://gybird.co.ke/site/images/car_images/untitled-design-11-1764663536.png')
    @('volkswagen', 'rear', 'https://gybird.co.ke/site/images/car_images/untitled-design-1782982920.png')
    @('volkswagen', 'cabin', 'https://gybird.co.ke/site/images/car_images/untitled-design-11-1764663536.png')

    # Peugeot - 3008 from Gybird
    @('peugeot', 'front', 'https://gybird.co.ke/site/images/car_images/untitled-design-1787651960.png')
    @('peugeot', 'side', 'https://gybird.co.ke/site/images/car_images/untitled-design-1787651960.png')
    @('peugeot', 'rear', 'https://gybird.co.ke/site/images/car_images/untitled-design-1787651960.png')
    @('peugeot', 'cabin', 'https://gybird.co.ke/site/images/car_images/untitled-design-1787651960.png')

    # Mercedes from Gybird
    @('mercedes', 'front', 'https://gybird.co.ke/site/images/car_images/untitled-design-2026-03-05t152941-750-1772714246.jpg')
    @('mercedes', 'side', 'https://gybird.co.ke/site/images/car_images/untitled-design-2026-03-05t152941-750-1772714246.jpg')
    @('mercedes', 'rear', 'https://gybird.co.ke/site/images/car_images/untitled-design-2026-03-05t152941-750-1772714246.jpg')
    @('mercedes', 'cabin', 'https://gybird.co.ke/site/images/car_images/untitled-design-2026-03-05t152941-750-1772714246.jpg')

    # BMW from Gybird
    @('bmw', 'front', 'https://gybird.co.ke/site/images/car_images/bmw-1758030408.jpg')
    @('bmw', 'side', 'https://gybird.co.ke/site/images/car_images/bmw-1758030408.jpg')
    @('bmw', 'rear', 'https://gybird.co.ke/site/images/car_images/bmw-1758030408.jpg')
    @('bmw', 'cabin', 'https://gybird.co.ke/site/images/car_images/bmw-1758030408.jpg')

    # Ford from Gybird
    @('ford', 'front', 'https://gybird.co.ke/site/images/car_images/untitled-design-2026-03-24t111021-588-1774340337.jpg')
    @('ford', 'side', 'https://gybird.co.ke/site/images/car_images/untitled-design-2026-03-24t111021-588-1774340337.jpg')
    @('ford', 'rear', 'https://gybird.co.ke/site/images/car_images/untitled-design-2026-03-24t111021-588-1774340337.jpg')
    @('ford', 'cabin', 'https://gybird.co.ke/site/images/car_images/untitled-design-2026-03-24t111021-588-1774340337.jpg')

    # Honda from Gybird
    @('honda', 'front', 'https://gybird.co.ke/site/images/car_images/untitled-design-1784113788.png')
    @('honda', 'side', 'https://gybird.co.ke/site/images/car_images/untitled-design-1784113788.png')
    @('honda', 'rear', 'https://gybird.co.ke/site/images/car_images/untitled-design-1784113788.png')
    @('honda', 'cabin', 'https://gybird.co.ke/site/images/car_images/untitled-design-1784113788.png')

    # Lexus from Gybird
    @('lexus', 'front', 'https://gybird.co.ke/site/images/car_images/untitled-design-1779708307.png')
    @('lexus', 'side', 'https://gybird.co.ke/site/images/car_images/untitled-design-1779708307.png')
    @('lexus', 'rear', 'https://gybird.co.ke/site/images/car_images/untitled-design-1779708307.png')
    @('lexus', 'cabin', 'https://gybird.co.ke/site/images/car_images/untitled-design-1779708307.png')

    # Land Rover from Gybird
    @('land-rover', 'front', 'https://gybird.co.ke/site/images/car_images/untitled-design-1781872675.png')
    @('land-rover', 'side', 'https://gybird.co.ke/site/images/car_images/untitled-design-1781872675.png')
    @('land-rover', 'rear', 'https://gybird.co.ke/site/images/car_images/untitled-design-1781872675.png')
    @('land-rover', 'cabin', 'https://gybird.co.ke/site/images/car_images/untitled-design-1781872675.png')

    # Mitsubishi from Gybird
    @('mitsubishi', 'front', 'https://gybird.co.ke/site/images/car_images/untitled-design-1787741391.png')
    @('mitsubishi', 'side', 'https://gybird.co.ke/site/images/car_images/untitled-design-2023-1752493586.jpg')
    @('mitsubishi', 'rear', 'https://gybird.co.ke/site/images/car_images/untitled-design-2023-1752493586.jpg')
    @('mitsubishi', 'cabin', 'https://gybird.co.ke/site/images/car_images/untitled-design-2023-1752493586.jpg')

    # Suzuki from Gybird
    @('suzuki', 'front', 'https://gybird.co.ke/site/images/car_images/untitled-design-1787812511.png')
    @('suzuki', 'side', 'https://gybird.co.ke/site/images/car_images/untitled-design-1787812511.png')
    @('suzuki', 'rear', 'https://gybird.co.ke/site/images/car_images/untitled-design-1787812511.png')
    @('suzuki', 'cabin', 'https://gybird.co.ke/site/images/car_images/untitled-design-1787812511.png')

    # Volvo from Gybird
    @('volvo', 'front', 'https://gybird.co.ke/site/images/car_images/untitled-design-1787752787.png')
    @('volvo', 'side', 'https://gybird.co.ke/site/images/car_images/untitled-design-1787752787.png')
    @('volvo', 'rear', 'https://gybird.co.ke/site/images/car_images/untitled-design-1787752787.png')
    @('volvo', 'cabin', 'https://gybird.co.ke/site/images/car_images/untitled-design-1787752787.png')

    # Audi from Gybird
    @('audi', 'front', 'https://gybird.co.ke/site/images/car_images/untitled-design-1783600873.png')
    @('audi', 'side', 'https://gybird.co.ke/site/images/car_images/untitled-design-1783600873.png')
    @('audi', 'rear', 'https://gybird.co.ke/site/images/car_images/untitled-design-1783600873.png')
    @('audi', 'cabin', 'https://gybird.co.ke/site/images/car_images/untitled-design-1783600873.png')

    # Isuzu - from Cars45
    @('isuzu', 'front', 'https://www.cars45.co.ke/r/cGljdHVyZXMta2VueWEuamlqaXN0YXRpYy5jb20/83231485_MTgwLTMxMC01OGZhOWI3MGMx.jpg')
    @('isuzu', 'side', 'https://www.cars45.co.ke/r/cGljdHVyZXMta2VueWEuamlqaXN0YXRpYy5jb20/83231485_MTgwLTMxMC01OGZhOWI3MGMx.jpg')
    @('isuzu', 'rear', 'https://www.cars45.co.ke/r/cGljdHVyZXMta2VueWEuamlqaXN0YXRpYy5jb20/83231485_MTgwLTMxMC01OGZhOWI3MGMx.jpg')
    @('isuzu', 'cabin', 'https://www.cars45.co.ke/r/cGljdHVyZXMta2VueWEuamlqaXN0YXRpYy5jb20/83231485_MTgwLTMxMC01OGZhOWI3MGMx.jpg')

    # Jeep - from Cars45 (use similar style image)
    @('jeep', 'front', 'https://www.cars45.co.ke/r/cGljdHVyZXMta2VueWEuamlqaXN0YXRpYy5jb20/84024419_MTgwLTEzNS03OWY0OGJjMzZk.jpg')
    @('jeep', 'side', 'https://www.cars45.co.ke/r/cGljdHVyZXMta2VueWEuamlqaXN0YXRpYy5jb20/84024419_MTgwLTEzNS03OWY0OGJjMzZk.jpg')
    @('jeep', 'rear', 'https://www.cars45.co.ke/r/cGljdHVyZXMta2VueWEuamlqaXN0YXRpYy5jb20/84024419_MTgwLTEzNS03OWY0OGJjMzZk.jpg')
    @('jeep', 'cabin', 'https://www.cars45.co.ke/r/cGljdHVyZXMta2VueWEuamlqaXN0YXRpYy5jb20/84024419_MTgwLTEzNS03OWY0OGJjMzZk.jpg')

    # Hyundai - from Cars45 (use Audi Q3 as representation since no specific Hyundai found)
    @('hyundai', 'front', 'https://gybird.co.ke/site/images/car_images/untitled-design-1783600873.png')
    @('hyundai', 'side', 'https://gybird.co.ke/site/images/car_images/untitled-design-1783600873.png')
    @('hyundai', 'rear', 'https://gybird.co.ke/site/images/car_images/untitled-design-1783600873.png')
    @('hyundai', 'cabin', 'https://gybird.co.ke/site/images/car_images/untitled-design-1783600873.png')

    # Kia - from Cars45 (use Mazda CX-5 as representation)
    @('kia', 'front', 'https://gybird.co.ke/site/images/car_images/untitled-design-1787814490.png')
    @('kia', 'side', 'https://gybird.co.ke/site/images/car_images/untitled-design-1787814490.png')
    @('kia', 'rear', 'https://gybird.co.ke/site/images/car_images/untitled-design-1787814490.png')
    @('kia', 'cabin', 'https://gybird.co.ke/site/images/car_images/untitled-design-1787814490.png')
)

foreach ($entry in $downloads) {
    $make = $entry[0]
    $label = $entry[1]
    $url = $entry[2]

    $dest = "client\public\cars\$make\$label.jpg"
    Write-Host "Downloading $make/$label.jpg ..." -NoNewline

    try {
        Invoke-WebRequest -Uri $url -OutFile $dest -TimeoutSec 30
        Write-Host " OK" -ForegroundColor Green
    } catch {
        Write-Host " FAILED" -ForegroundColor Red
    }
}

Write-Host "`nDownload complete!" -ForegroundColor Cyan
