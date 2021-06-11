import os
import re
from .models import Project
from django.utils.encoding import escape_uri_path
from django.http import StreamingHttpResponse
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import ProjectSerializer


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class SignApk(APIView):
    FILE_PATH = "/tmp/files"

    def get(self, request):
        result = {"status": 200, "data": "SignApk API"}
        return Response(result)

    def create_folder(self, filepath):
        if not os.path.exists(filepath):
            os.makedirs(filepath)

    def file_iterator(self, file_path, chunk_size=512):
        """
        文件生成器,防止文件过大，导致内存溢出
        :param file_path: 文件绝对路径
        :param chunk_size: 块大小
        :return: 生成器
        """
        with open(file_path, mode='rb') as file:
            while True:
                chunk = file.read(chunk_size)
                if chunk:
                    yield chunk
                else:
                    break

    def post(self, request):
        response = {} #return data

        request_type = request.data.get('type')
        if request_type == "undefined":
            response['msg'] = "request type not defined."
            response['code'] = 1
        elif request_type == "upload": #上传文件
            request_file = request.data.get('file')
            project = request.data.get('project')
            if request_file == "undefined":
                response['msg'] = "file is null"
                response['code'] = 2
            elif project == "undefined":
                response['msg'] = 'project is null.'
                response['code'] = 3
            else:
                file_type = re.match(r'.*\.(apk)', request_file.name)
                if not file_type:
                    response['msg'] = 'upload file type not support.'
                    response['code'] = 4
                else:
                    self.create_folder(self.FILE_PATH)
                    upload_file = os.path.join(self.FILE_PATH, request_file.name)
                    content = []
                    for line in request_file.read().splitlines():
                        content.append(line)
                    upload_file_w = open(upload_file, 'wb+')
                    for chunk in request_file.chunks():
                        upload_file_w.write(chunk)
                    upload_file_w.close()

                    if project in ('U316AT', 'U319AA', "U536AF"):
                        os.chdir("/data/MT_R_NA_DEV/android")
                        os.system("out/.path/java -Xmx1024M "
                              "-Djava.library.path=out/host/linux-x86/lib64 "
                              "-jar out/host/linux-x86/framework/apksigner.jar  sign "
                              "--key device/tinno/common/security/platform.pk8 "
                              "--cert device/tinno/common/security/platform.x509.pem "
                              + upload_file)

                        response['msg'] = "upload file success."
                        response['download'] = request_file.name
                        response['code'] = 200
                    else:
                        response['msg'] = "project[{0}] not support.".format(project)
                        response['code'] = 5
        elif request_type == "download":
            filename = request.data.get('filename')
            download_filepath = os.path.join(self.FILE_PATH, filename)
            response = StreamingHttpResponse(self.file_iterator(download_filepath))
            response['Content-Type'] = 'application/octet-stream'
            response['Access-Control-Expose-Headers'] = "Content-Disposition, Content-Type"
            response['Content-Disposition'] = "attachment; filename={}".format(escape_uri_path(filename))
            response['msg'] = "download succee"
            response['code'] = 200
            return response
        return  Response(response)
