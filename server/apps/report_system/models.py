from django.db import models
from utils.model import SoftModel, BaseModel
from django.utils import timezone
from datetime import datetime

# Create your models here.

class Work_order(BaseModel):
	
	name = models.CharField('製令', max_length=10, unique=True)
	status = models.CharField('狀態', max_length=5, null=True, blank=True)
	start_time =models.DateTimeField(default=timezone.now, verbose_name='開始時間', help_text='開始時間', null=True, blank=True)
	end_time =models.DateTimeField(default=timezone.now, verbose_name='結束時間', help_text='結束時間', null=True, blank=True)
	
	
	class Meta:
		verbose_name = '製令'
		verbose_name_plural = verbose_name

	def __str__(self):
		return self.name