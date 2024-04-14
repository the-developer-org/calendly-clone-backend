exports.verifyEmailTemplate = (verificationEmailUrl) => {
  console.log(verificationEmailUrl);
  return `
    <html lang="en">
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <style media="all" type="text/css">
                @media all {
                    .btn-primary table td:hover {
                        background-color: #ec0867 !important;
                    }
    
                    .btn-primary a:hover {
                        background-color: #ec0867 !important;
                        border-color: #ec0867 !important;
                    }
                }
                @media only screen and (max-width: 640px) {
                    .main p,
                    .main td,
                    .main span {
                        font-size: 16px !important;
                    }
    
                    .wrapper {
                        padding: 8px !important;
                    }
    
                    .content {
                        padding: 0 !important;
                    }
    
                    .container {
                        padding: 0 !important;
                        padding-top: 8px !important;
                        width: 100% !important;
                    }
    
                    .main {
                        border-left-width: 0 !important;
                        border-radius: 0 !important;
                        border-right-width: 0 !important;
                    }
    
                    .btn table {
                        max-width: 100% !important;
                        width: 100% !important;
                    }
    
                    .btn a {
                        font-size: 16px !important;
                        max-width: 100% !important;
                        width: 100% !important;
                    }
                }
                @media all {
                    .ExternalClass {
                        width: 100%;
                    }
    
                    .ExternalClass,
                    .ExternalClass p,
                    .ExternalClass span,
                    .ExternalClass font,
                    .ExternalClass td,
                    .ExternalClass div {
                        line-height: 100%;
                    }
    
                    .apple-link a {
                        color: inherit !important;
                        font-family: inherit !important;
                        font-size: inherit !important;
                        font-weight: inherit !important;
                        line-height: inherit !important;
                        text-decoration: none !important;
                    }
    
                    #MessageViewBody a {
                        color: inherit;
                        text-decoration: none;
                        font-size: inherit;
                        font-family: inherit;
                        font-weight: inherit;
                        line-height: inherit;
                    }
                }
            </style>
        </head>
        <body
            style="
                font-family: Helvetica, sans-serif;
                -webkit-font-smoothing: antialiased;
                font-size: 16px;
                line-height: 1.3;
                -ms-text-size-adjust: 100%;
                -webkit-text-size-adjust: 100%;
                background-color: #f4f5f6;
                margin: 0;
                padding: 0;
            ">
            <table
                role="presentation"
                border="0"
                cellpadding="0"
                cellspacing="0"
                class="body"
                style="
                    border-collapse: separate;
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    background-color: #f4f5f6;
                    width: 100%;
                "
                width="100%"
                bgcolor="#f4f5f6">
                <tr>
                    <td
                        style="
                            font-family: Helvetica, sans-serif;
                            font-size: 16px;
                            vertical-align: top;
                        "
                        valign="top">
                        &nbsp;
                    </td>
                    <td
                        class="container"
                        style="
                            font-family: Helvetica, sans-serif;
                            font-size: 16px;
                            vertical-align: top;
                            max-width: 600px;
                            padding: 0;
                            padding-top: 24px;
                            width: 600px;
                            margin: 0 auto;
                        "
                        width="600"
                        valign="top">
                        <div
                            class="content"
                            style="
                                box-sizing: border-box;
                                display: block;
                                margin: 0 auto;
                                max-width: 600px;
                                padding: 0;
                            ">
                            <!-- START CENTERED WHITE CONTAINER -->
                            <span
                                class="preheader"
                                style="
                                    color: transparent;
                                    display: none;
                                    height: 0;
                                    max-height: 0;
                                    max-width: 0;
                                    opacity: 0;
                                    overflow: hidden;
                                    mso-hide: all;
                                    visibility: hidden;
                                    width: 0;
                                "
                                >Welcome to Eventify. Verify your email address to avail all the features of Eventify</span
                            >
                            <table
                                role="presentation"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="main"
                                style="
                                    border-collapse: separate;
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    background: #ffffff;
                                    border: 1px solid #eaebed;
                                    border-radius: 16px;
                                    width: 100%;
                                "
                                width="100%">
                                <!-- START MAIN CONTENT AREA -->
                                <tr>
                                    <td
                                        class="wrapper"
                                        style="
                                            font-family: Helvetica, sans-serif;
                                            font-size: 16px;
                                            vertical-align: top;
                                            box-sizing: border-box;
                                            padding: 24px;
                                        "
                                        valign="top">
                                        <p
                                            style="
                                                font-family: Helvetica, sans-serif;
                                                font-size: 16px;
                                                font-weight: normal;
                                                margin: 0;
                                                margin-bottom: 16px;
                                            ">
                                            Hello user
                                        </p>
                                        <p
                                            style="
                                                font-family: Helvetica, sans-serif;
                                                font-size: 16px;
                                                font-weight: normal;
                                                margin: 0;
                                                margin-bottom: 16px;
                                            ">
                                            Unlock the full potential of Eventify and let your appointement game go to new level! 🚀 Click the link below to step into a world of seamlessly managed appointment booking. Your journey is about to get a whole lot better!
                                        </p>
                                        <table
                                            role="presentation"
                                            border="0"
                                            cellpadding="0"
                                            cellspacing="0"
                                            class="btn btn-primary"
                                            style="
                                                border-collapse: separate;
                                                mso-table-lspace: 0pt;
                                                mso-table-rspace: 0pt;
                                                box-sizing: border-box;
                                                width: 100%;
                                                min-width: 100%;
                                            "
                                            width="100%">
                                            <tbody>
                                                <tr>
                                                    <td
                                                        align="left"
                                                        style="
                                                            font-family: Helvetica,
                                                                sans-serif;
                                                            font-size: 16px;
                                                            vertical-align: top;
                                                            padding-bottom: 16px;
                                                        "
                                                        valign="top">
                                                        <table
                                                            role="presentation"
                                                            border="0"
                                                            cellpadding="0"
                                                            cellspacing="0"
                                                            style="
                                                                border-collapse: separate;
                                                                mso-table-lspace: 0pt;
                                                                mso-table-rspace: 0pt;
                                                                width: auto;
                                                            ">
                                                            <tbody>
                                                                <tr>
                                                                    <td
                                                                        style="
                                                                            font-family: Helvetica,
                                                                                sans-serif;
                                                                            font-size: 16px;
                                                                            vertical-align: top;
                                                                            border-radius: 4px;
                                                                            text-align: center;
                                                                            background-color: #0867ec;
                                                                        "
                                                                        valign="top"
                                                                        align="center"
                                                                        bgcolor="#0867ec">
                                                                        <a
                                                                            href="${verificationEmailUrl}"
                                                                            target="_blank"
                                                                            style="
                                                                                border: solid
                                                                                    2px
                                                                                    #0867ec;
                                                                                border-radius: 4px;
                                                                                box-sizing: border-box;
                                                                                cursor: pointer;
                                                                                display: inline-block;
                                                                                font-size: 16px;
                                                                                font-weight: bold;
                                                                                margin: 0;
                                                                                padding: 12px
                                                                                    24px;
                                                                                text-decoration: none;
                                                                                text-transform: capitalize;
                                                                                background-color: #0867ec;
                                                                                border-color: #0867ec;
                                                                                color: #ffffff;
                                                                            "
                                                                            >Verify Your email</a
                                                                        >
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <p
                                            style="
                                                font-family: Helvetica, sans-serif;
                                                font-size: 16px;
                                                font-weight: normal;
                                                margin: 0;
                                                margin-bottom: 16px;
                                            ">

                                        </p>
                                        <p
                                            style="
                                                font-family: Helvetica, sans-serif;
                                                font-size: 16px;
                                                font-weight: normal;
                                                margin: 0;
                                                margin-bottom: 16px;
                                            ">
                                        
                                        </p>
                                    </td>
                                </tr>
    
                                <!-- END MAIN CONTENT AREA -->
                            </table>
    
                            <!-- START FOOTER -->
                            <div
                                class="footer"
                                style="
                                    clear: both;
                                    padding-top: 24px;
                                    text-align: center;
                                    width: 100%;
                                ">
                                <table
                                    role="presentation"
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    style="
                                        border-collapse: separate;
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        width: 100%;
                                    "
                                    width="100%">
                                    <tr>
                                        <td
                                            class="content-block"
                                            style="
                                                font-family: Helvetica, sans-serif;
                                                vertical-align: top;
                                                color: #9a9ea6;
                                                font-size: 16px;
                                                text-align: center;
                                            "
                                            valign="top"
                                            align="center">
                                            
                                            <br />
                                            
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            class="content-block powered-by"
                                            style="
                                                font-family: Helvetica, sans-serif;
                                                vertical-align: top;
                                                color: #9a9ea6;
                                                font-size: 16px;
                                                text-align: center;
                                            "
                                            valign="top"
                                            align="center">
                                            
                                        </td>
                                    </tr>
                                </table>
                            </div>
    
                            <!-- END FOOTER -->
    
                            <!-- END CENTERED WHITE CONTAINER -->
                        </div>
                    </td>
                    <td
                        style="
                            font-family: Helvetica, sans-serif;
                            font-size: 16px;
                            vertical-align: top;
                        "
                        valign="top">
                        &nbsp;
                    </td>
                </tr>
            </table>
        </body>
    </html>`;
};
exports.slotEmailTemplate = (name, time, link) => {
  return `<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Confirmation</title>
</head>
<body>
    <div style="background-color: white; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); border-radius: 0.5rem; padding: 1.5rem; border: 1px solid #e2e8f0; max-width: 36rem;">
        <h2 style="font-size: 1.25rem; font-weight: 600; color: #2d3748; margin-bottom: 0.5rem;">Booking Confirmed!</h2>
        <p style="color: #4a5568;">Your slot for the <span style="font-weight: 600;">${name}</span> has been successfully booked.</p>
        <div style="margin-top: 1rem;">
            <h3 style="font-weight: 600; color: #2d3748;">Slot Details:</h3>
            <ul style="list-style-type: disc; padding-left: 1.5rem;">
                <li>Time: <span style="font-weight: 400; color: #718096;">${time}</span></li>
                <li>Event: <span style="font-weight: 400; color: #718096;">${name}</span></li>
                <li>Meeting Link: <a href="${link}" style="color: #4299e1; text-decoration: none;">${link}</a></li>
            </ul>
        </div>
        <div style="margin-top: 1rem;">
            <a href="${link}" style="display: inline-block; background-color: #4299e1; color: white; padding: 0.5rem 1rem; border-radius: 0.25rem; text-decoration: none; transition: background-color 0.2s;">Join Meeting</a>
        </div>
    </div>
</body>
</html>

    `;
};
