import http from 'http';

const server = http.createServer((req, res) => {

    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const path = parsedUrl.pathname;
    const params = Object.fromEntries(parsedUrl.searchParams) ;
    console.log(params) ;
    let status = 200;
    const response = {
        message:"" ,
    }

    switch (path) {
        case '/':
            response.message = "Welcome to the Home Page!";
            break;
        case '/about':
            response.message = "This is the About Page";
            break;
        case '/json':
            const name = params.name ? params.name : "Guest";
            response.message = `Hello ${name}!`;
            break;
        case '/create':
            status = 201;
            response.message = "Resource created successfully!";
            break;
        default:
            status = 404;
            response.message = "404 Not Found";
            break;
    }

    const acceptHeader = req.headers.accept || "";
    const isHtml = acceptHeader.includes("text/html");
    const contentType = isHtml ? "text/html" : "application/json";

    res.writeHead(status, { "Content-Type": contentType });

    if (isHtml) {
        res.end(response.message); 
    } else {
        res.end(JSON.stringify(response));
    }
});

server.listen(3000, () => {
    console.log("Running on server 3000");
});
