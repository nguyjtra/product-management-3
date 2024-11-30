<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Project Overview</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 20px;
            color: #333;
        }
        h1, h2 {
            color: #0073e6;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 10px;
            background-color: #f9f9f9;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        a {
            color: #0073e6;
            text-decoration: none;
            font-weight: bold;
        }
        a:hover {
            text-decoration: underline;
        }
        .credentials {
            background-color: #eef6ff;
            padding: 10px;
            border-radius: 5px;
            border: 1px solid #cce4ff;
            margin-top: 10px;
        }
        ul {
            margin: 10px 0;
            padding-left: 20px;
        }
        ul li {
            margin-bottom: 10px;
        }
        footer {
            text-align: center;
            margin-top: 20px;
            font-size: 0.9em;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Technologies</h1>
        <p>This project includes two main components: the <strong>Client Side</strong> and the <strong>Admin Side</strong>. Use the links below to access them.</p>
        <h2>Links to the Application:</h2>
        <ul>
            <li><a href="https://product-management-3-g6p9.vercel.app/user/login" target="_blank">Client Page</a></li>
            <li><a href="https://product-management-3-g6p9.vercel.app/admin/auth/login" target="_blank">Admin Page</a></li>
        </ul>
        <h2>Login Credentials:</h2>
        <div class="credentials">
            <p><strong>Email:</strong> ngytran@ucdavis.edu</p>
            <p><strong>Password:</strong> 12345</p>
        </div>
        <h2>Project Details</h2>
        <ul>
            <li>
                <strong>Client Side:</strong> Allows users to browse, select, and purchase products online, significantly improving customer engagement and boosting sales conversion rates.
            </li>
            <li>
                <strong>Admin Side:</strong> Empowers administrators to efficiently manage inventory, monitor transactions, and oversee customer interactions, ensuring smooth operations and real-time updates.
            </li>
        </ul>
        <h2>Tech Stack</h2>
        <ul>
            <li><strong>Language:</strong> JavaScript</li>
            <li><strong>Frontend:</strong> Bootstrap 5, Pug, HTML/CSS</li>
            <li><strong>Backend:</strong> Node.js, Express.js</li>
            <li><strong>Database:</strong> MongoDB Atlas, Cloudinary</li>
            <li><strong>Deployment:</strong> Vercel, Render</li>
        </ul>
        <h2>Features</h2>
        <ul>
            <li><strong>Real-Time Communication:</strong> Integrated Socket.IO for live updates and instant messaging, boosting user engagement and increasing active session durations.</li>
            <li><strong>Media Management:</strong> Leveraged Cloudinary for dynamic media transformations and automatic image optimization, reducing load times and improving overall performance.</li>
            <li><strong>Secure Authentication:</strong> Implemented MD5 for user account protection and enabled password resets via OTP sent to Gmail, ensuring data security and user convenience.</li>
        </ul>
        <footer>
            <p>Note: Ensure sensitive information is kept secure in production environments.</p>
        </footer>
    </div>
</body>
</html>
