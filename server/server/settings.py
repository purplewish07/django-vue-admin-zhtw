"""
Django settings for server project.

Generated by 'django-admin startproject' using Django 3.0.3.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.0/ref/settings/
"""

from datetime import datetime, timedelta
import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'ez9z3a4m*$%srn9ve_t71yd!v+&xn9@0k(e(+l6#g1h=e5i4da'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False
if DEBUG is True:
    SESSION_COOKIE_SECURE = False
    CSRF_COOKIE_HTTPONLY = False
else:
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_HTTPONLY = True
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTOCOL', 'https')


ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'django_celery_beat',
    'drf_yasg',
    'rest_framework',
    'bulk_update_or_create',
    "django_filters",
    'simple_history',
    'werkzeug_debugger_runserver',
    'django_extensions',
    'apps.system',
    'apps.monitor',
    'apps.report_system',
    'apps.task_system',
    'apps.tag_system',
    'apps.warehouse_management',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'simple_history.middleware.HistoryRequestMiddleware',
]

ROOT_URLCONF = 'server.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': ['vuedist'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'server.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases


# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

LANGUAGE_CODE = 'zh-Hant'

TIME_ZONE = 'Asia/Taipei'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'vuedist/static'),
)

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# ????????????
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# restframework??????
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
        'apps.system.permission.RbacPermission'
    ],
    'DEFAULT_RENDERER_CLASSES': [
        'utils.response.FitJSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer'
    ],
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.SearchFilter',
        'rest_framework.filters.OrderingFilter'
    ],
    'DEFAULT_PAGINATION_CLASS': 'utils.pagination.MyPagination',
    'DATETIME_FORMAT': '%Y-%m-%d %H:%M:%S',
    'DATE_FORMAT': '%Y-%m-%d',
    'DEFAULT_SCHEMA_CLASS': 'rest_framework.schemas.coreapi.AutoSchema',
    'UNAUTHENTICATED_USER': None,
    'UNAUTHENTICATED_TOKEN': None,
}
# simplejwt??????
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=1),
    # 'ACCESS_TOKEN_LIFETIME': timedelta(seconds=10),
    # 'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    # 'ROTATE_REFRESH_TOKENS': True,
}

# ????????????/??????nginx??????,????????????corsheaders
CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]
CORS_ALLOWED_ORIGINS = [
    "http://localhost:8100",
    "http://192.168.2.3:9528",
    "http://192.168.2.3:8000",
]

# Auth??????
AUTH_USER_MODEL = 'system.User'
AUTHENTICATION_BACKENDS = (
    'apps.system.authentication.CustomBackend',
)

# ????????????,?????????????????????redis
# CACHES = {
#     "default": {
#         "BACKEND": "django_redis.cache.RedisCache",
#         "LOCATION": "redis://redis:6379/1",
#         "OPTIONS": {
#             "CLIENT_CLASS": "django_redis.client.DefaultClient",
#             "PICKLE_VERSION": -1
#         }
#     }
# }

# celery??????,celery????????????????????????redis
# CELERY_BROKER_URL = "redis://redis:6379/0"   # ????????????
CELERY_BROKER_URL = "redis://127.0.0.1:6379/0"   # ????????????
CELERYD_MAX_TASKS_PER_CHILD = 100  # ??????worker????????????300????????????????????????????????????????????????
CELERY_TIMEZONE = 'Asia/Taipei'  # ????????????
CELERY_ENABLE_UTC = True  # ??????????????????

# swagger??????
SWAGGER_SETTINGS = {
   'LOGIN_URL':'/api/admin/login/',
   'LOGOUT_URL':'/api/admin/logout/'
}

# ????????????
# ?????????????????????
LOG_PATH = os.path.join(BASE_DIR, 'log')
# ???????????????????????????????????????log?????????
if not os.path.join(LOG_PATH):
    os.mkdir(LOG_PATH)
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        # ????????????
        'standard': {
            'format': '[%(asctime)s] [%(filename)s:%(lineno)d] [%(module)s:%(funcName)s] '
                      '[%(levelname)s]- %(message)s'},
        'simple': {  # ????????????
            'format': '%(levelname)s %(message)s'
        },
    },
    # ??????
    'filters': {
        'require_debug_true': {
            '()': 'django.utils.log.RequireDebugTrue',
        },
    },
    # ?????????????????????????????????
    'handlers': {
        # ????????????????????????
        'default': {
            'level': 'INFO',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': os.path.join(LOG_PATH, 'all-{}.log'.format(datetime.now().strftime('%Y-%m-%d'))),
            'maxBytes': 1024 * 1024 * 5,  # ????????????
            'backupCount': 5,  # ?????????
            'formatter': 'standard',  # ????????????
            'encoding': 'utf-8',  # ???????????????????????????????????????????????????
        },
        # ??????????????????
        'error': {
            'level': 'ERROR',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': os.path.join(LOG_PATH, 'error-{}.log'.format(datetime.now().strftime('%Y-%m-%d'))),
            'maxBytes': 1024 * 1024 * 5,  # ????????????
            'backupCount': 5,  # ?????????
            'formatter': 'standard',  # ????????????
            'encoding': 'utf-8',  # ??????????????????
        },
        # ???????????????
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'filters': ['require_debug_true'],
            'formatter': 'standard'
        },
        # ??????info??????
        'info': {
            'level': 'INFO',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': os.path.join(LOG_PATH, 'info-{}.log'.format(datetime.now().strftime('%Y-%m-%d'))),
            'maxBytes': 1024 * 1024 * 5,
            'backupCount': 5,
            'formatter': 'standard',
            'encoding': 'utf-8',  # ??????????????????
        },
    },
    # ?????????????????? handlers ???????????????
    'loggers': {
        # ?????? ??? django ?????????????????????????????? ????????????
        'django': {
            'handlers': ['default', 'console'],
            'level': 'INFO',
            'propagate': False
        },
        # log ?????????????????????????????????
        'log': {
            'handlers': ['error', 'info', 'console', 'default'],
            'level': 'INFO',
            'propagate': True
        },
    }
}
