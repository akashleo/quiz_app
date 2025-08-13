# Backend Interview Questions (QUIZ App)

### General & Architecture

1.  **Q: What is the core technology stack of this backend application?**
    A: The backend is built on Node.js and the Express framework. It uses MongoDB as its database, with Mongoose as the ODM for data modeling and interaction. It's configured to use ES Modules (`import`/`export` syntax).

2.  **Q: Describe the project's architectural pattern.**
    A: The project follows a pattern similar to Model-View-Controller (MVC), with distinct layers for `routes` (handling API endpoints), `controllers` (containing business logic), `models` (defining Mongoose data schemas), and `middleware` (for handling cross-cutting concerns like authentication).

3.  **Q: How are environment variables managed in this project?**
    A: The `dotenv` package is used to load environment variables from a `.env` file into `process.env`. This is configured at the start of `app.js`. Key variables include database credentials, JWT secrets, and third-party API keys.

### Authentication & Authorization

4.  **Q: Explain the JWT authentication and token refresh mechanism.**
    A: Upon successful login, the server generates a short-lived access token (24h) and a long-lived refresh token (7d). The access token is sent with each request for authorization. When it expires, the client sends the refresh token to the `/user/refresh-token` endpoint to get a new pair of tokens without requiring the user to log in again.

5.  **Q: How is role-based access control (RBAC) implemented?**
    A: RBAC is handled by the `authorizeRole` function in `middleware/authMiddleware.js`. This middleware accepts an array of allowed roles (e.g., `['admin']`). It checks if the `req.user.role` (populated by the `authenticateToken` middleware) is included in the allowed roles, denying access if it's not.

6.  **Q: How does the application handle password security?**
    A: The `bcryptjs` library is used. Passwords are never stored in plaintext. When a user registers or sets a password, it is hashed using `bcrypt.hashSync()`. During login, the provided password is compared to the stored hash using `bcrypt.compareSync()`.

7.  **Q: Describe the Google OAuth 2.0 login flow.**
    A: The flow is managed by `passport` and `passport-google-oauth20`. The client initiates login at `/user/auth/google`. After user consent, Google redirects to the `/user/auth/google/callback` endpoint. The `googleStrategy` finds or creates a user profile, and the callback handler then generates JWT access/refresh tokens and redirects back to the frontend with the tokens.

8.  **Q: What is the purpose of the OTP verification system?**
    A: It's used for email verification. The `/user/verify/send-otp` endpoint generates a 6-digit OTP, hashes it, stores it in the `Otp` collection with an expiry, and emails it to the user via the Resend service. The `/user/verify/validate-otp` endpoint validates the submitted OTP against the stored hash, protecting against replay attacks and brute-forcing.

9.  **Q: Explain the admin access request and approval workflow.**
    A: A user can request admin access via the `/user/admin/request` endpoint, which creates a profile with `adminAccessRequested` set to `PENDING`. An existing admin must then call `/user/admin/approve/:profileId` to approve the request, which changes the user's role to `admin` and sets their status to `APPROVED`.

### Database (Mongoose)

10. **Q: What is the primary user model and what are its key fields?**
    A: The primary user model is `Profile` defined in `model/Profile.js`. Key fields include `email`, `password`, `googleId`, `role` (enum: 'user', 'admin'), `isVerified`, and `adminAccessRequested` (enum for the approval workflow).

11. **Q: How does the `ProfileSchema` handle users who sign up with Google vs. email/password?**
    A: The schema is flexible. The `password` field is not strictly required, and the `googleId` field is `unique` but also `sparse`, meaning it's only indexed for documents that have it. This allows a profile to exist with either a `password` (for local auth) or a `googleId` (for OAuth).

12. **Q: What is the purpose of the `Otp` model?**
    A: The `Otp` model (`model/Otp.js`) stores temporary data for the email verification process. It holds the user's email, the hashed OTP, an expiration timestamp, and counters for resend attempts and validation attempts to implement rate limiting.

### API & Routes

13. **Q: How are routes organized in `app.js`?**
    A: `app.js` acts as the central point for mounting modular route handlers. It imports router instances (e.g., `userRouter`, `topicRouter`) from the `./routes` directory and associates them with base paths (e.g., `app.use('/user', userRouter)`).

14. **Q: How are protected routes secured? Provide an example from `userRoutes.js`.**
    A: Protected routes are secured by chaining middleware functions before the controller. For example, `userRouter.get('/', authenticateToken, authorizeRole(['admin']), getAllUser)` first runs `authenticateToken` to validate the JWT, then `authorizeRole` to ensure the user is an admin, before finally executing `getAllUser`.

15. **Q: What third-party services does the backend integrate with, based on `package.json` and the code?**
    A: It integrates with **Resend** for sending transactional emails (like OTPs), **Google Cloud Storage** (`@google-cloud/storage`) for file uploads, and **Passport** for handling Google OAuth authentication.

16. **Q: How are environment variables used for API configuration?**
    A: `src/AxiosConfig.js` uses `process.env.REACT_APP_API_URL` to set `baseURL`. In CRA, variables must be prefixed with `REACT_APP_` and defined at build time.

17. **Q: How are tests structured and run?**
    A: Tests are in `src/**/*.test.js` and `src/**/*.test.jsx`. They use Jest + React Testing Library. CI runs `npm test:ci` with coverage thresholds.

18. **Q: How are performance metrics collected and reported?**
    A: `reportWebVitals.js` is scaffolded by CRA to measure Web Vitals. It logs metrics to the console and can be extended to send to analytics. Currently, it’s included but not necessarily wired up.

### Node.js & Express.js Fundamentals

19. **Q: Explain the Node.js Event Loop and how it enables non-blocking I/O operations.**
    A: The Event Loop is Node.js's mechanism for handling asynchronous operations. It continuously checks the call stack and processes the callback queue. When an async operation (like file I/O or network request) completes, its callback is placed in the queue. The Event Loop moves callbacks to the call stack when it's empty, enabling non-blocking behavior. This single-threaded, event-driven architecture allows Node.js to handle thousands of concurrent connections efficiently.

20. **Q: What is middleware in Express.js and how does it work?**
    A: Middleware in Express are functions that have access to the request (`req`), response (`res`), and the next middleware function in the application's request-response cycle. They can execute any code, modify request/response objects, end the request-response cycle, or call the next middleware. Middleware is mounted using `app.use()` or specific HTTP verb methods (`app.get()`, `app.post()`, etc.). The order of middleware definition is crucial as they execute sequentially.

21. **Q: How does Node.js handle child processes and when would you use them?**
    A: Node.js provides the `child_process` module to create child processes. Key methods include:
    - `spawn()`: Launches a command in a new process
    - `exec()`: Runs a command in a shell and buffers the output
    - `fork()`: Special case of `spawn()` for Node.js processes
    
    Use cases:
    - CPU-intensive tasks to avoid blocking the event loop
    - Running shell commands or scripts
    - Parallel processing of large datasets
    - Isolating unstable or memory-intensive operations

22. **Q: Explain the concept of streams in Node.js and their types.**
    A: Streams are collections of data that might not be available all at once. They're particularly useful for handling large datasets or data that comes from an external source gradually.
    
    Types of streams:
    - **Readable**: Streams from which data can be read (e.g., `fs.createReadStream()`)
    - **Writable**: Streams to which data can be written (e.g., `fs.createWriteStream()`)
    - **Duplex**: Streams that are both Readable and Writable (e.g., `net.Socket`)
    - **Transform**: Duplex streams that can modify or transform the data as it is written and read (e.g., `zlib.createGzip()`)

### Google Cloud Platform (GCP) Fundamentals

23. **Q: What is the difference between Google Compute Engine (GCE), Google Kubernetes Engine (GKE), and Cloud Run?**
    A:
    - **Compute Engine (GCE)**: Infrastructure-as-a-Service (IaaS) offering providing VMs in Google's data centers. You manage the OS, runtime, and application code.
    
    - **Kubernetes Engine (GKE)**: Managed Kubernetes service for running containerized applications. Handles container orchestration while you manage the Kubernetes clusters.
    
    - **Cloud Run**: Serverless platform for running stateless containers. Automatically scales based on HTTP requests and you only pay when requests are being processed. Abstracts away infrastructure management.

24. **Q: How does Cloud Storage work and what are its storage classes?**
    A: Google Cloud Storage is a scalable object storage service. Key features and storage classes:
    
    - **Multi-Regional**: High-availability, frequently accessed data
    - **Regional**: Frequently accessed data in specific regions
    - **Nearline**: Data accessed less than once per month
    - **Coldline**: Data accessed less than once per quarter
    - **Archive**: Lowest cost, for data accessed less than once per year
    
    It offers features like versioning, lifecycle management, and fine-grained access controls.

25. **Q: Explain Cloud Functions and their typical use cases.**
    A: Cloud Functions is a serverless execution environment for building and connecting cloud services. Key aspects:
    
    - **Event-driven**: Triggered by HTTP requests or events from 100+ Google Cloud sources
    - **Stateless**: Each function execution is independent
    - **Auto-scaling**: Automatically scales up and down based on load
    - **Pay-per-use**: Billed only for execution time and resources used
    
    Common use cases:
    - Processing files when uploaded to Cloud Storage
    - Webhooks and API endpoints
    - Lightweight data processing and transformations
    - IoT data processing
    - Chatbots and virtual assistants

26. **Q: What is Cloud IAM and how does it work?**
    A: Cloud Identity and Access Management (IAM) provides fine-grained access control for Google Cloud resources. Key concepts:
    
    - **Principals**: Who (users, service accounts, groups, domains)
    - **Roles**: Collections of permissions (primitive, predefined, or custom)
    - **Policies**: Bindings between principals and roles
    
    IAM follows the principle of least privilege and allows for organization, folder, project, and resource-level permissions. It supports conditions for attribute-based access control (ABAC).

27. **Q: How would you monitor and debug a Node.js application in production on GCP?**
    A: GCP offers several tools for monitoring and debugging:
    
    - **Cloud Monitoring**: For metrics, dashboards, and alerts
    - **Cloud Logging**: Centralized logging with advanced querying
    - **Cloud Trace**: For latency analysis and performance optimization
    - **Cloud Debugger**: For inspecting application state in real-time without stopping the app
    - **Error Reporting**: Aggregates and displays errors in the application
    
    Best practices:
    - Use structured logging with severity levels
    - Add context to logs (request IDs, user IDs)
    - Set up meaningful alerts and SLOs
    - Use distributed tracing for microservices
    - Implement health checks and uptime monitoring