# Generated by Django 3.2.4 on 2021-07-22 08:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='status',
            field=models.CharField(choices=[('Order Canceled', 'Order Canceled'), ('Order Completed', 'Order Completed'), ('On the way', 'On the way'), ('Order Processing', 'Order Processing'), ('Order Received', 'Order Received')], default='Order Received', max_length=30),
        ),
    ]
