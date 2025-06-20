# Use an official Python runtime as a parent image
FROM python:3.11

# Set the working directory
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY ./backend /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install PyYAML

# Expose the port that the app runs on
EXPOSE 8080

# Run the command to start the server
CMD ["gunicorn", "-w", "2", "-k", "sync", "-t", "240", "-b", "0.0.0.0:8080", "app:app"]

