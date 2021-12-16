from .settings import *
import pymysql
pymysql.install_as_MySQLdb()

DEBUG = True
DATABASES = {
	 'default': {
		 'ENGINE': 'django.db.backends.mysql',
		 'NAME': 'mes',
		 'USER': 'usr',
		 'PASSWORD': 'uta1234',
		 'HOST': '192.168.2.3',
		 'PORT': '3306',
		'OPTIONS': {
		'sql_mode': 'traditional',
		}
	 }
	#'default': {
	#	 'ENGINE': 'django.db.backends.sqlite3',
	#	 'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
	#}
}

# celery配置
CELERY_BEAT_SCHEDULER = 'django_celery_beat.schedulers:DatabaseScheduler'