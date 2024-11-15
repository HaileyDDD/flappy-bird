FROM nginx:alpine

COPY index.html /usr/share/nginx/html/
COPY assets /usr/share/nginx/html/assets/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"] 