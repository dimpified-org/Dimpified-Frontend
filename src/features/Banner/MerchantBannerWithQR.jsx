import { useState, useEffect, useRef } from "react";
import Dimp from "../../pages/LandingPages/images/dimp-blue.png";
import Banner from "../../pages/LandingPages/images/base-banner.png";
import QRCode from "qrcode";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Link } from "react-router-dom";

const MerchantBannerWithQR = () => {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [qrcode, setQrcode] = useState("");
  const [darkColor, setDarkColor] = useState("#500073");
  const [lightColor, setLightColor] = useState("#FFFFFFFF");
  const [logo, setLogo] = useState(null);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const [downloaded, setDownloaded] = useState(false);
  const [inputError, setInputError] = useState(false);
  
  // A4 dimensions in millimeters and pixels
  const A4_WIDTH_MM = 210;
  const A4_HEIGHT_MM = 297;
  const A4_WIDTH_PX = 794; // 210mm * (96px / 25.4mm)
  const A4_HEIGHT_PX = 1123; // 297mm * (96px / 25.4mm)
  
  const bannerRef = useRef(null);
  const [previewScale, setPreviewScale] = useState(0.4); // Default preview scale

  // Update preview scale based on container width
  useEffect(() => {
    const updatePreviewScale = () => {
      const container = document.querySelector('.preview-container');
      if (container) {
        const containerWidth = container.clientWidth;
        const maxPreviewWidth = containerWidth * 0.9; // 90% of container width
        const scale = Math.min(maxPreviewWidth / A4_WIDTH_PX, 0.8); // Max 80% scale
        setPreviewScale(Math.max(scale, 0.3)); // Minimum 30% scale
      }
    };

    updatePreviewScale();
    window.addEventListener('resize', updatePreviewScale);
    return () => window.removeEventListener('resize', updatePreviewScale);
  }, []);

  useEffect(() => {
    const generateQRCode = () => {
      if (!url) {
        setQrcode("");
        return;
      }

      if (url.length > 100) {
        setError("Link or text cannot exceed 100 characters!");
        setQrcode("");
        return;
      }

      setError("");

      QRCode.toDataURL(
        url,
        {
          width: 800,
          margin: 0,
          color: {
            dark: darkColor,
            light: lightColor,
          },
        },
        (err, qrUrl) => {
          if (err) {
            console.error(err);
            return;
          }

          if (logo) {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            const img = new Image();
            img.src = qrUrl;

            img.onload = () => {
              canvas.width = img.width;
              canvas.height = img.height;
              ctx.drawImage(img, 0, 0);

              const centerX = canvas.width / 2;
              const centerY = canvas.height / 2;
              const radius = 60; // Slightly larger for better A4 scaling

              ctx.fillStyle = "#ffffff";
              ctx.beginPath();
              ctx.arc(centerX, centerY, radius + 6, 0, Math.PI * 2);
              ctx.fill();

              const logoImg = new Image();
              logoImg.src = URL.createObjectURL(logo);

              logoImg.onload = () => {
                ctx.drawImage(
                  logoImg,
                  centerX - radius,
                  centerY - radius,
                  radius * 2,
                  radius * 2
                );
                setQrcode(canvas.toDataURL());
              };
            };
          } else {
            setQrcode(qrUrl);
          }
        }
      );
    };

    generateQRCode();
  }, [url, name, darkColor, lightColor, logo]);

  const handleDownload = async () => {
    if (!isFormValid) {
      setInputError(true);
      return;
    }

    setInputError(false);
    const element = bannerRef.current;

    // Store original content and dimensions
    const originalContent = element.innerHTML;
    const originalStyles = {
      width: element.style.width,
      height: element.style.height,
      backgroundSize: element.style.backgroundSize,
      position: element.style.position,
      left: element.style.left,
      top: element.style.top,
      zIndex: element.style.zIndex,
      fontSize: element.style.fontSize,
      lineHeight: element.style.lineHeight,
      padding: element.style.padding,
      margin: element.style.margin,
    };

    // Create a scaled-up version for high-quality PDF
    const scaleFactor = 3; // Scale up for high resolution
    const scaledWidth = A4_WIDTH_PX * scaleFactor;
    const scaledHeight = A4_HEIGHT_PX * scaleFactor;

    // Create a temporary container with exact A4 dimensions at high resolution
    const tempContainer = document.createElement('div');
    tempContainer.style.width = `${scaledWidth}px`;
    tempContainer.style.height = `${scaledHeight}px`;
    tempContainer.style.backgroundImage = `url(${Banner})`;
    tempContainer.style.backgroundSize = '100% 100%';
    tempContainer.style.backgroundRepeat = 'no-repeat';
    tempContainer.style.position = 'fixed';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '0';
    tempContainer.style.zIndex = '9999';
    tempContainer.style.fontFamily = '"Urbanist", sans-serif';
    
    // Clone and scale all banner content
    const bannerContent = element.cloneNode(true);
    bannerContent.style.width = '100%';
    bannerContent.style.height = '100%';
    bannerContent.style.backgroundSize = '100% 100%';
    bannerContent.style.position = 'relative';
    
    // Scale all elements proportionally
    const scaleAllElements = (node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        // Scale font sizes
        if (node.style && node.style.fontSize) {
          const currentSize = parseFloat(node.style.fontSize);
          if (!isNaN(currentSize)) {
            node.style.fontSize = `${currentSize * scaleFactor}px`;
          }
        }
        
        // Scale dimensions
        if (node.style && node.style.width) {
          const currentWidth = parseFloat(node.style.width);
          if (!isNaN(currentWidth)) {
            node.style.width = `${currentWidth * scaleFactor}px`;
          }
        }
        
        if (node.style && node.style.height) {
          const currentHeight = parseFloat(node.style.height);
          if (!isNaN(currentHeight)) {
            node.style.height = `${currentHeight * scaleFactor}px`;
          }
        }
        
        // Scale padding and margin
        if (node.style && node.style.padding) {
          const padding = parseFloat(node.style.padding);
          if (!isNaN(padding)) {
            node.style.padding = `${padding * scaleFactor}px`;
          }
        }
        
        if (node.style && node.style.margin) {
          const margin = parseFloat(node.style.margin);
          if (!isNaN(margin)) {
            node.style.margin = `${margin * scaleFactor}px`;
          }
        }
        
        // Scale border radius
        if (node.style && node.style.borderRadius) {
          const borderRadius = parseFloat(node.style.borderRadius);
          if (!isNaN(borderRadius)) {
            node.style.borderRadius = `${borderRadius * scaleFactor}px`;
          }
        }
        
        // Scale top/left positions
        if (node.style && node.style.top) {
          const top = parseFloat(node.style.top);
          if (!isNaN(top)) {
            node.style.top = `${top * scaleFactor}px`;
          }
        }
        
        if (node.style && node.style.left) {
          const left = parseFloat(node.style.left);
          if (!isNaN(left)) {
            node.style.left = `${left * scaleFactor}px`;
          }
        }
        
        // Recursively process child nodes
        node.childNodes.forEach(child => scaleAllElements(child));
      }
    };
    
    // Add scaled content to temp container
    tempContainer.innerHTML = element.innerHTML;
    
    // Create scaled version of the banner
    const scaledBanner = document.createElement('div');
    scaledBanner.style.width = `${scaledWidth}px`;
    scaledBanner.style.height = `${scaledHeight}px`;
    scaledBanner.style.backgroundImage = `url(${Banner})`;
    scaledBanner.style.backgroundSize = '100% 100%';
    scaledBanner.style.backgroundRepeat = 'no-repeat';
    scaledBanner.style.position = 'relative';
    scaledBanner.style.fontFamily = '"Urbanist", sans-serif';
    
    // Add all elements with proper scaling
    if (qrcode) {
      // DIMP Logo (scaled)
      const dimpLogoContainer = document.createElement('div');
      dimpLogoContainer.style.position = 'absolute';
      dimpLogoContainer.style.left = '0';
      dimpLogoContainer.style.right = '0';
      dimpLogoContainer.style.display = 'flex';
      dimpLogoContainer.style.justifyContent = 'center';
      dimpLogoContainer.style.top = `${(scaledHeight * 0.08)}px`;
      
      const dimpLogo = document.createElement('img');
      dimpLogo.src = Dimp;
      dimpLogo.alt = "Dimp";
      dimpLogo.style.height = `${32 * scaleFactor}px`; // Scale from 24px base
      dimpLogo.style.width = 'auto';
      dimpLogo.style.borderRadius = '8px';
      dimpLogoContainer.appendChild(dimpLogo);
      scaledBanner.appendChild(dimpLogoContainer);
      
      // Main Heading (scaled)
      const headingContainer = document.createElement('div');
      headingContainer.style.position = 'absolute';
      headingContainer.style.left = '0';
      headingContainer.style.right = '0';
      headingContainer.style.display = 'flex';
      headingContainer.style.justifyContent = 'center';
      headingContainer.style.alignItems = 'center';
      headingContainer.style.top = `${(scaledHeight * 0.15)}px`;
      
      const heading = document.createElement('h2');
      heading.textContent = "See our prices and book ahead";
      heading.style.color = '#500073';
      heading.style.fontSize = `${40 * scaleFactor}px`; // Scale from 48px base
      heading.style.fontWeight = 'bold';
      heading.style.textAlign = 'center';
      heading.style.margin = '0';
      headingContainer.appendChild(heading);
      scaledBanner.appendChild(headingContainer);
      
      // QR Code Container (scaled)
      const qrContainer = document.createElement('div');
      qrContainer.style.position = 'absolute';
      qrContainer.style.left = '0';
      qrContainer.style.right = '0';
      qrContainer.style.display = 'flex';
      qrContainer.style.justifyContent = 'center';
      qrContainer.style.alignItems = 'center';
      qrContainer.style.top = `${(scaledHeight * 0.30)}px`;
      
      const qrWrapper = document.createElement('div');
      qrWrapper.style.backgroundColor = '#500073';
      qrWrapper.style.padding = `${16 * scaleFactor}px`;
      qrWrapper.style.borderRadius = `${12 * scaleFactor}px`;
      
      const qrTitle = document.createElement('h2');
      qrTitle.textContent = "SCAN HERE";
      qrTitle.style.color = 'white';
      qrTitle.style.fontSize = `${24 * scaleFactor}px`;
      qrTitle.style.fontWeight = 'bold';
      qrTitle.style.textAlign = 'center';
      qrTitle.style.margin = '0';
      qrTitle.style.paddingBottom = `${16 * scaleFactor}px`;
      
      const qrCodeBox = document.createElement('div');
      qrCodeBox.style.backgroundColor = 'white';
      qrCodeBox.style.padding = `${12 * scaleFactor}px`;
      qrCodeBox.style.borderRadius = `${8 * scaleFactor}px`;
      
      const qrImage = document.createElement('img');
      qrImage.src = qrcode;
      qrImage.alt = "QR Code";
      qrImage.style.width = `${320 * scaleFactor}px`; // Scale QR code
      qrImage.style.height = `${320 * scaleFactor}px`;
      qrImage.style.borderRadius = `${4 * scaleFactor}px`;
      
      qrCodeBox.appendChild(qrImage);
      qrWrapper.appendChild(qrTitle);
      qrWrapper.appendChild(qrCodeBox);
      qrContainer.appendChild(qrWrapper);
      scaledBanner.appendChild(qrContainer);
      
      // Visit Text (scaled)
      const visitContainer = document.createElement('div');
      visitContainer.style.position = 'absolute';
      visitContainer.style.left = '0';
      visitContainer.style.right = '0';
      visitContainer.style.display = 'flex';
      visitContainer.style.justifyContent = 'center';
      visitContainer.style.alignItems = 'center';
      visitContainer.style.top = `${(scaledHeight * 0.80)}px`;
      
      const visitText = document.createElement('h2');
      visitText.textContent = "or visit:";
      visitText.style.color = '#500073';
      visitText.style.fontSize = `${18 * scaleFactor}px`;
      visitText.style.margin = '0';
      visitContainer.appendChild(visitText);
      scaledBanner.appendChild(visitContainer);
      
      // URL (scaled)
      const urlContainer = document.createElement('div');
      urlContainer.style.position = 'absolute';
      urlContainer.style.left = '0';
      urlContainer.style.right = '0';
      urlContainer.style.display = 'flex';
      urlContainer.style.justifyContent = 'center';
      urlContainer.style.alignItems = 'center';
      urlContainer.style.top = `${(scaledHeight * 0.85)}px`;
      
      const urlText = document.createElement('h2');
      urlText.textContent = url;
      urlText.style.color = '#500073';
      urlText.style.fontSize = `${24 * scaleFactor}px`;
      urlText.style.fontWeight = 'bold';
      urlText.style.margin = '0';
      urlText.style.textTransform = 'lowercase';
      urlContainer.appendChild(urlText);
      scaledBanner.appendChild(urlContainer);
      
      // Thank You Message (scaled)
      const thankYouContainer = document.createElement('div');
      thankYouContainer.style.position = 'absolute';
      thankYouContainer.style.left = '0';
      thankYouContainer.style.right = '0';
      thankYouContainer.style.display = 'flex';
      thankYouContainer.style.justifyContent = 'center';
      thankYouContainer.style.alignItems = 'center';
      thankYouContainer.style.top = `${(scaledHeight * 0.94)}px`;
      
      const thankYouText = document.createElement('h2');
      thankYouText.textContent = `Thank you for choosing ${name}`;
      thankYouText.style.color = 'white';
      thankYouText.style.fontSize = `${24 * scaleFactor}px`;
      thankYouText.style.textAlign = 'center';
      thankYouText.style.margin = '0';
      thankYouContainer.appendChild(thankYouText);
      scaledBanner.appendChild(thankYouContainer);
    }
    
    document.body.appendChild(tempContainer);
    tempContainer.appendChild(scaledBanner);

    try {
      const canvas = await html2canvas(scaledBanner, {
        scale: 1, // We're already scaling manually
        useCORS: true,
        backgroundColor: null,
        width: scaledWidth,
        height: scaledHeight,
        windowWidth: scaledWidth,
        windowHeight: scaledHeight,
        logging: false,
      });

      // Clean up
      document.body.removeChild(tempContainer);

      // Restore original content and styles
      element.innerHTML = originalContent;
      Object.keys(originalStyles).forEach((key) => {
        element.style[key] = originalStyles[key];
      });

      // Calculate dimensions for PDF
      const imgData = canvas.toDataURL("image/png", 1.0);
      const pdf = new jsPDF("p", "mm", "a4");

      // Add image to fill entire A4 page
      pdf.addImage(imgData, "PNG", 0, 0, A4_WIDTH_MM, A4_HEIGHT_MM);
      
      // Save PDF with business name
      const pdfFileName = name ? `${name.replace(/\s+/g, '-').toLowerCase()}-banner.pdf` : "banner.pdf";
      pdf.save(pdfFileName);
      setDownloaded(true);
      
    } catch (error) {
      console.error("Error generating PDF:", error);
      // Clean up on error
      if (tempContainer.parentNode) {
        document.body.removeChild(tempContainer);
      }
      // Restore original content and styles
      element.innerHTML = originalContent;
      Object.keys(originalStyles).forEach((key) => {
        element.style[key] = originalStyles[key];
      });
    }
  };

  const isFormValid = url.trim() && name.trim();

  return (
    <>
      <div className="flex flex-col items-center justify-center lg:bg-[#f5f5f5] bg-white font-Urbanist text-black lg:px-0 px-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 w-full lg:mt-16 lg:mb-12 my-10 max-w-7xl mx-auto lg:shadow-lg">
          <div className="relative lg:p-16 px-4 bg-white rounded-xl">
            <Link to="/merchants">
              <img
                src={Dimp}
                alt="Logo"
                className="h-6 mb-6 rounded-xl w-auto"
              />
            </Link>

            <h1 className="text-3xl mb-4 font-medium tracking-wide">
              Merchant Banner Generator
            </h1>
            <p className="text-gray-400 mb-8">
              All elements will be properly scaled to A4 size when downloading.
            </p>
            <div className="mb-4">
              <label htmlFor="url" className="block mb-4 text-sm">
                Enter your link or text (100 characters max.)
              </label>
              <input
                type="text"
                placeholder="e.g. https://folabarber.dimpified.com"
                value={url}
                maxLength={100}
                onChange={(evt) => setUrl(evt.target.value)}
                className={`w-full px-6 py-3 bg-[#f5f5f5] text-black border-2 rounded-full 
                  focus:ring-0 focus:outline-none ${
                    inputError ? "border-red-500 focus:ring-red-500" : ""
                  }`}
              />

              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-4 text-sm">
                Enter your business name (100 characters max.)
              </label>
              <input
                type="text"
                placeholder="e.g. Fola Barbing Salon"
                value={name}
                maxLength={100}
                onChange={(evt) => setName(evt.target.value)}
                className={`w-full px-6 py-3 bg-[#f5f5f5] text-black border-2 rounded-full 
                  focus:ring-0 focus:outline-none ${
                    inputError ? "border-red-500 focus:ring-red-500" : ""
                  }`}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="logo" className="block mb-4 text-sm">
                Upload Your Business Logo (Optional)
              </label>
              <div className="relative">
                <input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={(evt) => {
                    setLogo(evt.target.files[0]);
                    setFileName(evt.target.files[0]?.name || "");
                  }}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <button
                  type="button"
                  className="w-full px-6 py-3 bg-[#f5f5f5] text-black rounded-full focus:outline-none focus:ring-2 focus:ring-[#fffffe]"
                >
                  Choose File
                </button>
              </div>
              {fileName && (
                <p className="text-sm text-sec10 mt-2">Logo Name: {fileName}</p>
              )}
              <div className="justify-center items-center flex mt-12">
                <button
                  onClick={handleDownload}
                  disabled={!isFormValid || downloaded}
                  className={`w-full my-6 py-3 text-center bg-[#500073] hover:bg-yellow-500 transition text-white rounded-full font-semibold 
                    ${!isFormValid ? "opacity-50 cursor-not-allowed" : ""} 
                    ${inputError ? "ring-2 ring-red-500" : ""}`}
                >
                  {downloaded ? "Downloaded" : "Download as PDF (A4 Format)"}
                </button>
              </div>
              {downloaded && (
                <p className="text-green-500 text-sm text-center mt-6">
                  Your A4 business booking banner has been downloaded successfully!
                </p>
              )}
            </div>
          </div>

          <div className="lg:px-16 lg:py-14 px-4 bg-white rounded-e-xl preview-container">
            <p className="text-center py-4">
              A4 Format Banner Preview (Scaled to fit):
            </p>
            <div className="flex justify-center items-center">
              <div
                ref={bannerRef}
                id="printable-area"
                className="relative bg-cover mx-auto border border-gray-300 shadow-lg"
                style={{
                  backgroundImage: `url(${Banner})`,
                  width: `${A4_WIDTH_PX * previewScale}px`,
                  height: `${A4_HEIGHT_PX * previewScale}px`,
                  backgroundSize: "100% 100%",
                  backgroundRepeat: "no-repeat",
                }}
              >
                {qrcode && (
                  <>
                    {/* DIMP Logo */}
                    <div
                      className="absolute inset-x-0 flex justify-center items-center"
                      style={{ top: "8%" }}
                    >
                      <img
                        src={Dimp}
                        alt="Dimp"
                        style={{
                          height: `${24 * previewScale}px`,
                        }}
                        className="rounded-xl w-auto"
                      />
                    </div>

                    {/* Main Heading */}
                    <div
                      className="absolute inset-x-0 flex justify-center items-center"
                      style={{ top: "17%" }}
                    >
                      <h2
                        className="text-center text-[#500073] font-bold"
                        style={{
                          fontSize: `${36 * previewScale}px`,
                          lineHeight: 1.2,
                        }}
                      >
                        See our prices and book ahead
                      </h2>
                    </div>

                    {/* QR Code Container */}
                    <div
                      className="absolute inset-x-0 flex justify-center items-center"
                      style={{ top: "35%" }}
                    >
                      <div
                        className="bg-[#500073] rounded-lg"
                        style={{
                          padding: `${16 * previewScale}px`,
                        }}
                      >
                        <h2
                          className="text-center text-white font-semibold"
                          style={{
                            fontSize: `${24 * previewScale}px`,
                            paddingBottom: `${8 * previewScale}px`,
                          }}
                        >
                          SCAN HERE
                        </h2>
                        <div
                          className="bg-white rounded-lg"
                          style={{
                            padding: `${12 * previewScale}px`,
                          }}
                        >
                          <img
                            src={qrcode}
                            alt="QR Code"
                            style={{
                              width: `${320 * previewScale}px`,
                              height: `${320 * previewScale}px`,
                            }}
                            className="rounded-lg"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Visit Text */}
                    <div
                      className="absolute inset-x-0 flex justify-center items-center"
                      style={{ top: "80%" }}
                    >
                      <h2
                        className="text-[#500073]"
                        style={{ fontSize: `${18 * previewScale}px` }}
                      >
                        or visit:
                      </h2>
                    </div>

                    {/* URL */}
                    <div
                      className="absolute inset-x-0 flex justify-center items-center"
                      style={{ top: "85%" }}
                    >
                      <h2
                        className="text-[#500073] font-semibold truncate max-w-full px-2"
                        style={{
                          fontSize: `${22 * previewScale}px`,
                        }}
                      >
                        {url}
                      </h2>
                    </div>

                    {/* Thank You Message */}
                    <div
                      className="absolute inset-x-0 flex justify-center items-center"
                      style={{ top: "95%" }}
                    >
                      <h2
                        className="text-center text-white"
                        style={{
                          fontSize: `${18 * previewScale}px`,
                        }}
                      >
                        Thank you for choosing {name}
                      </h2>
                    </div>
                  </>
                )}
              </div>
            </div>
            {/* <div className="text-center mt-4 text-sm text-gray-500">
              Preview scaled to {(previewScale * 100).toFixed(0)}%. 
              Download will produce exact A4 dimensions (210×297mm) with all elements properly scaled.
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default MerchantBannerWithQR;