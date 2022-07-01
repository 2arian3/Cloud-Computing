FROM python:3.10-alpine AS build

RUN python3 -m venv /opt/venv
ENV PATH /opt/venv/bin:$PATH
RUN python3 -m pip install --upgrade pip

COPY requirements.txt .
RUN pip3 install -r requirements.txt


FROM python:3.10-alpine AS target
COPY --from=build /opt/venv /opt/venv
ENV PATH /opt/venv/bin:$PATH

WORKDIR /app
COPY . ./

EXPOSE 8080

CMD ["python3", "app.py"]