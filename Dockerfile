FROM node:18-alpine

WORK-DIR /shoponapp

COPY . .

RUN npm install
