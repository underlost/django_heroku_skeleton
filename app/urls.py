from django.conf.urls import include, url
from django.contrib.sitemaps.views import sitemap
from django.contrib import admin
from django.conf import settings
from django.views.generic import TemplateView
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

from coreExtend import views as core_views

admin.autodiscover()
admin.site.site_header = r_settings.SITE_NAME

urlpatterns = [
    #admin
    url(r'^admin42/', include(admin.site.urls)),

    #API
    #url(r'^api/docs/', include('rest_framework_swagger.urls')),
    url(r'^api/v2/auth/', include('rest_framework.urls', namespace='rest_framework')),

    # Static
    url(r'^404/$', TemplateView.as_view(template_name="404.html"), name="404_page"),
    url(r'^500/$', TemplateView.as_view(template_name="500.html"), name="500_page"),
    url(r'^robots\.txt$', TemplateView.as_view(template_name="robots.txt", content_type='text/plain')),
    url(r'^humans\.txt$', TemplateView.as_view(template_name="humans.txt", content_type='text/plain')),

    # Apps
    url(r'^', include('coreExtend.urls', namespace='CoreExtend')),
]

urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
