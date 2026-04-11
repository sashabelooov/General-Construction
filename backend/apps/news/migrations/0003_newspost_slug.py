from django.db import migrations, models
from django.utils.text import slugify


def populate_slugs(apps, schema_editor):
    NewsPost = apps.get_model("news", "NewsPost")
    for post in NewsPost.objects.all():
        base_slug = slugify(post.title, allow_unicode=True) or f"news-{post.pk}"
        slug = base_slug
        counter = 1
        while NewsPost.objects.filter(slug=slug).exclude(pk=post.pk).exists():
            slug = f"{base_slug}-{counter}"
            counter += 1
        post.slug = slug
        post.save(update_fields=["slug"])


class Migration(migrations.Migration):

    dependencies = [
        ("news", "0002_alter_newspost_options_and_more"),
    ]

    operations = [
        # Step 1: add slug without unique constraint
        migrations.AddField(
            model_name="newspost",
            name="slug",
            field=models.SlugField(blank=True, default="", max_length=255, verbose_name="Slug"),
        ),
        # Step 2: populate slugs for existing rows
        migrations.RunPython(populate_slugs, migrations.RunPython.noop),
        # Step 3: add unique constraint now that all rows have a slug
        migrations.AlterField(
            model_name="newspost",
            name="slug",
            field=models.SlugField(blank=True, max_length=255, unique=True, verbose_name="Slug"),
        ),
    ]
