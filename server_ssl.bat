call .\venv\Scripts\activate.bat
cd server
python manage.py runserver_plus --cert server.crt 0.0.0.0:8000