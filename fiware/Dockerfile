FROM python:3.11-slim
WORKDIR /app

COPY requerements.txt .
RUN pip install -r requerements.text .

COPY server.py .
COPY speaker.py .

CMD [ "true" ]