import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0003_alter_amenity_options_alter_apartment_options_and_more'),
        ('leads', '0002_alter_conversation_options_alter_lead_options_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='lead',
            name='project',
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to='content.project',
                verbose_name='Project',
            ),
        ),
        migrations.RemoveField(
            model_name='lead',
            name='apartment',
        ),
    ]
