FROM python:3.10.19

WORKDIR /app

COPY . /app

RUN pip install -r requirements.txt

# Install the package itself so imports work
RUN pip install -e .

CMD ["python3", "app.py"]
