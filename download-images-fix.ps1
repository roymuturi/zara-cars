$ErrorActionPreference = 'Continue'

$makes = @(
    'toyota', 'subaru', 'mazda', 'nissan', 'volkswagen', 'peugeot',
    'mercedes', 'bmw', 'ford', 'honda', 'lexus', 'land-rover',
    'mitsubishi', 'suzuki', 'volvo', 'audi', 'isuzu', 'jeep',
    'hyundai', 'kia'
)

$urls = @{
    'toyota' = @(
        'https://gybird.co.ke/site/images/car_images/2-1787208146.jpg',
        'https://gybird.co.ke/site/images/car_images/3-6a86a1d2a4ab4.jpg',
        'https://gybird.co.ke/site/images/car_images/4-6a86a1d2a4f8c.jpg',
        'https://gybird.co.ke/site/images/car_images/5-6a86a1d2a5241.jpg'
    )
    'subaru' = @(
        'https://gybird.co.ke/site/images/car_images/untitled-design-1787748942.png',
        'https://gybird.co.ke/site/images/car_images/untitled-design-1781013725.png',
        'https://gybird.co.ke/site/images/car_images/untitled-design-1787748942.png',
        'https://gybird.co.ke/site/images/car_images/untitled-design-1781013725.png'
    )
    'mazda' = @(
        'https://gybird.co.ke/site/images/car_images/untitled-design-1787814490.png',
        'https://gybird.co.ke/site/images/car_images/untitled-design-1787650044.png',
        'https://gybird.co.ke/site/images/car_images/2-1787203834.jpg',
        'https://gybird.co.ke/site/images/car_images/untitled-design-1787743929.png'
    )
    'nissan' = @(
        'https://gybird.co.ke/site/images/car_images/untitled-design-1787573118.png',
        'https://gybird.co.ke/site/images/car_images/untitled-design-1787311573.png',
        'https://gybird.co.ke/site/images/car_images/untitled-design-1787573118.png',
        'https://gybird.co.ke/site/images/car_images/untitled-design-1787311573.png'
    )
    'volkswagen' = @(
        'https://gybird.co.ke/site/images/car_images/untitled-design-1782982920.png',
        'https://gybird.co.ke/site/images/car_images/untitled-design-11-1764663536.png',
        'https://gybird.co.ke/site/images/car_images/untitled-design-1782982920.png',
        'https://gybird.co.ke/site/images/car_images/untitled-design-11-1764663536.png'
    )
    'peugeot' = @(
        'https://gybird.co.ke/site/images/car_images/untitled-design-1787651960.png',
        'https://gybird.co.ke/site/images/car_images/untitled-design-1787746172.png',
        'https://gybird.co.ke/site/images/car_images/untitled-design-1787651960.png',
        'https://gybird.co.ke/site/images/car_images/untitled-design-1787746172.png'
    )
    'mercedes' = @(
        'https://gybird.co.ke/site/images/car_images/untitled-design-2026-03-05t152941-750-1772714246.jpg',
        'https://gybird.co.ke/site/images/car_images/untitled-design-2026-03-05t152941-750-1772714246.jpg',
        'https://gybird.co.ke/site/images/car_images/untitled-design-2026-03-05t152941-750-1772714246.jpg',
        'https://gybird.co.ke/site/images/car_images/untitled-design-2026-03-05t152941-750-1772714246.jpg'
    )
    'bmw' = @(
        'https://gybird.co.ke/site/images/car_images/bmw-1758030408.jpg',
        'https://gybird.co.ke/site/images/car_images/bmw-1758030408.jpg',
        'https://gybird.co.ke/site/images/car_images/bmw-1758030408.jpg',
        'https://gybird.co.ke/site/images/car_images/bmw-1758030408.jpg'
    )
    'ford' = @(
        'https://gybird.co.ke/site/images/car_images/untitled-design-2026-03-24t111021-588-1774340337.jpg',
        'https://gybird.co.ke/site/images/car_images/untitled-design-2026-03-24t111021-588-1774340337.jpg',
        'https://gybird.co.ke/site/images/car_images/untitled-design-2026-03-24t111021-588-1774340337.jpg',
        'https://gybird.co.ke/site/images/car_images/untitled-design-2026-03-24t111021-588-1774340337.jpg'
    )
    'honda' = @(
        'https://gybird.co.ke/site/images/car_images/untitled-design-1784113788.png',
        'https://gybird.co.ke/site/images/car_images/untitled-design-1784113788.png',
        'https://gybird.co.ke/site/images/car_images/untitled-design-1784113788.png',
        'https://gybird.co.ke/site/images/car_images/untitled-design-1784113788.png'
    )
    'lexus' = @(
        'https://gybird.co.ke/site/images/car_images/untitled-design-1779708307.png',
        'https://gybird.co.ke/site/images/car_images/untitled-design-1779708307.png',
        'https://gybird.co.ke/site/images/car_images/untitled-design-1779708307.png',
        'https://gybird.co.ke/site/images/car_images/untitled-design-1779708307.png'
    )
    'land-rover' = @(
        'https://gybird.co.ke/site/images/car_images/untitled-design-1781872675.png',
        'https://gybird.co.ke/site/images/car_images/untitled-design-1781872675.png',
        'https://gybird.co.ke/site/images/car_images/untitled-design-1781872675.png',
        'https://gybird.co.ke/site/images/car_images/untitled-design-1781872675.png'
    )
    'mitsubishi' = @(
        'https://gybird.co.ke/site/images/car_images/untitled-design-1787741391.png',
        'https://gybird.co.ke/site/images/car_images/untitled-design-2023-1752493586.jpg',
        'https://gybird.co.ke/site/images/car_images/untitled-design-2023-1752493586.jpg',
        'https://gybird.co.ke/site/images/car_images/untitled-design-2023-1752493586.jpg'
    )
    'suzuki' = @(
        'https://gybird.co.ke/site/images/car_images/untitled-design-1787812511.png',
        'https://gybird.co.ke/site/images/car_images/untitled-design-1787812511.png',
        'https://gybird.co.ke/site/images/car_images/untitled-design-1787812511.png',
        'https://gybird.co.ke/site/images/car_images/untitled-design-1787812511.png'
    )
    'volvo' = @(
        'https://gybird.co.ke/site/images/car_images/untitled-design-1787752787.png',
        'https://gybird.co.ke/site/images/car_images/untitled-design-1787752787.png',
        'https://gybird.co.ke/site/images/car_images/untitled-design-1787752787.png',
        'https://gybird.co.ke/site/images/car_images/untitled-design-1787752787.png'
    )
    'audi' = @(
        'https://gybird.co.ke/site/images/car_images/untitled-design-1783600873.png',
        'https://gybird.co.ke/site/images/car_images/untitled-design-1783600873.png',
        'https://gybird.co.ke/site/images/car_images/untitled-design-1783600873.png',
        'https://gybird.co.ke/site/images/car_images/untitled-design-1783600873.png'
    )
    'isuzu' = @(
        'https://www.cars45.co.ke/r/cGljdHVyZXMta2VueWEuamlqaXN0YXRpYy5jb20/83231485_MTgwLTMxMC01OGZhOWI3MGMx.jpg',
        'https://www.cars45.co.ke/r/cGljdHVyZXMta2VueWEuamlqaXN0YXRpYy5jb20/83231485_MTgwLTMxMC01OGZhOWI3MGMx.jpg',
        'https://www.cars45.co.ke/r/cGljdHVyZXMta2VueWEuamlqaXN0YXRpYy5jb20/83231485_MTgwLTMxMC01OGZhOWI3MGMx.jpg',
        'https://www.cars45.co.ke/r/cGljdHVyZXMta2VueWEuamlqaXN0YXRpYy5jb20/83231485_MTgwLTMxMC01OGZhOWI3MGMx.jpg'
    )
    'jeep' = @(
        'https://www.cars45.co.ke/r/cGljdHVyZXMta2VueWEuamlqaXN0YXRpYy5jb20/84024419_MTgwLTEzNS03OWY0OGJjMzZk.jpg',
        'https://www.cars45.co.ke/r/cGljdHVyZXMta2VueWEuamlqaXN0YXRpYy5jb20/84024419_MTgwLTEzNS03OWY0OGJjMzZk.jpg',
        'https://www.cars45.co.ke/r/cGljdHVyZXMta2VueWEuamlqaXN0YXRpYy5jb20/84024419_MTgwLTEzNS03OWY0OGJjMzZk.jpg',
        'https://www.cars45.co.ke/r/cGljdHVyZXMta2VueWEuamlqaXN0YXRpYy5jb20/84024419_MTgwLTEzNS03OWY0OGJjMzZk.jpg'
    )
    'hyundai' = @(
        'https://gybird.co.ke/site/images/car_images/untitled-design-1783600873.png',
        'https://gybird.co.ke/site/images/car_images/untitled-design-1783600873.png',
        'https://gybird.co.ke/site/images/car_images/untitled-design-1783600873.png',
        'https://gybird.co.ke/site/images/car_images/untitled-design-1783600873.png'
    )
    'kia' = @(
        'https://gybird.co.ke/site/images/car_images/untitled-design-1787814490.png',
        'https://gybird.co.ke/site/images/car_images/untitled-design-1787814490.png',
        'https://gybird.co.ke/site/images/car_images/untitled-design-1787814490.png',
        'https://gybird.co.ke/site/images/car_images/untitled-design-1787814490.png'
    )
}

$labels = @('front', 'side', 'rear', 'cabin')

foreach ($make in $makes) {
    Write-Host "--- $make ---" -ForegroundColor Cyan
    $dir = "client\public\cars\$make"
    if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir | Out-Null }
    
    $urlList = $urls[$make]
    for ($i = 0; $i -lt 4; $i++) {
        $dest = "$dir\$($labels[$i]).jpg"
        $url = $urlList[$i]
        try {
            Invoke-WebRequest -Uri $url -OutFile $dest -TimeoutSec 30
            Write-Host "  $($labels[$i]).jpg OK" -ForegroundColor Green
        } catch {
            Write-Host "  $($labels[$i]).jpg FAILED" -ForegroundColor Red
        }
    }
}

Write-Host "`nDownload complete!" -ForegroundColor Cyan
