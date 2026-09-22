$outputDir = "N:\Client Projects\HAIR EDGE UNISEX SALON MADHAPUR\hair-edge-salon\public\images\services"

# Service image mappings (Unsplash photo IDs)
$images = @{
    "hair-styling" = "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=600&fit=crop"
    "hair-cut" = "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&h=600&fit=crop"
    "hair-colour" = "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=800&h=600&fit=crop"
    "hair-straightening" = "https://images.unsplash.com/photo-1532635241-17e820acc59f?w=800&h=600&fit=crop"
    "hair-blow-dry" = "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop"
    "hair-curling" = "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&h=600&fit=crop"
    "hair-rebonding" = "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800&h=600&fit=crop"
    "beard-styling" = "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&h=600&fit=crop"
    "beard-shaving" = "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&h=600&fit=crop"
    "beard-trimming" = "https://images.unsplash.com/photo-1519019121993-813f3a6a4391?w=800&h=600&fit=crop"
    "full-body-waxing" = "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&h=600&fit=crop"
    "underarms-waxing" = "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&h=600&fit=crop"
    "full-leg-waxing" = "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&h=600&fit=crop"
    "full-arm-waxing" = "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop"
    "half-arm-waxing" = "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&h=600&fit=crop"
    "face-waxing" = "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=600&fit=crop"
    "half-leg-waxing" = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop"
    "hair-spa" = "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&h=600&fit=crop"
    "hair-wash" = "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&h=600&fit=crop"
    "face-bleach" = "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&h=600&fit=crop"
    "face-clean-up" = "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800&h=600&fit=crop"
    "face-d-tan" = "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&h=600&fit=crop"
    "facial" = "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&h=600&fit=crop"
    "head-massage" = "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop"
    "pedicure" = "https://images.unsplash.com/photo-1519019121993-813f3a6a4391?w=800&h=600&fit=crop"
    "manicure" = "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&h=600&fit=crop"
    "full-face-threading" = "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=600&fit=crop"
    "eye-brow-threading" = "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&h=600&fit=crop"
    "forehead-threading" = "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=600&fit=crop"
    "chin-threading" = "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&h=600&fit=crop"
    "lip-threading" = "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&h=600&fit=crop"
    "cheek-threading" = "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=600&fit=crop"
    "sideburn-threading" = "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&h=600&fit=crop"
    "hair-keratin" = "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800&h=600&fit=crop"
    "make-up" = "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=600&fit=crop"
}

$successCount = 0
$failCount = 0

foreach ($name in $images.Keys) {
    $url = $images[$name]
    $outFile = Join-Path $outputDir "$name.jpg"
    
    try {
        Invoke-WebRequest -Uri $url -OutFile $outFile -TimeoutSec 30 -ErrorAction Stop
        $size = (Get-Item $outFile).Length
        Write-Host "OK: $name ($size bytes)"
        $successCount++
    } catch {
        Write-Host "FAIL: $name - $($_.Exception.Message)"
        $failCount++
    }
}

Write-Host "`nDone: $successCount succeeded, $failCount failed"
