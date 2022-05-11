from django.db import models
from utils.model import SoftModel, BaseModel
from django.utils import timezone
from datetime import datetime
from bulk_update_or_create import BulkUpdateOrCreateQuerySet

# Create your models here.

class Storage_list(BaseModel):
	objects = BulkUpdateOrCreateQuerySet.as_manager()
	name = models.CharField('批號', max_length=10, unique=True)
	storage_spaces = models.CharField('儲位', max_length=5, null=True, blank=True)
	user = models.CharField('確認者', max_length=5, null=True, blank=True)
	update_time =models.DateTimeField(default=timezone.now, verbose_name='更新時間', help_text='更新時間', null=True, blank=True)
	
	class Meta:
		db_table = "warehouse_management"
