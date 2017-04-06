import datetime

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.shortcuts import render

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from account.models import Group
from .models import ScoreRecord


from rest_framework.authentication import SessionAuthentication 
class CsrfExemptSessionAuthentication(SessionAuthentication):
    def enforce_csrf(self, request):
        return  # To not perform the csrf check previously happening


# class Rank(APIView):

#     template = 'index.html'

#     def get(self, request):
#         return render(request, Rank.template)


#len(ScoreRecord.objects.filter(group=2))
class RankList(APIView):

    def get(self, request):
        
        top_score_list_for_groups  = []


        for group in Group.objects.all():
            score_record_of_group = ScoreRecord.objects.filter(group=group)
            top_nmi_record = score_record_of_group.order_by('-nmi').first()
            top_anc_record = score_record_of_group.order_by('-anc').first()
            latest_time = score_record_of_group.order_by('-create_at').first()
            total_upload_count = len(ScoreRecord.objects.filter(group=group))
            today_upload_count = len(ScoreRecord.objects.filter(create_date=datetime.date.today(), group=group))

            if(top_nmi_record == None or top_anc_record == None):
                top_score_list_for_groups.append(
                    {
                        "group": group.name,
                        "details" : {
                            "nmi": 0, 
                            "anc": 0,
                            "latest_time": '尚未上傳',
                            "total_count": 0,
                            "today_count": 0,
                        }
                    }
                )                
            else:
                top_score_list_for_groups.append(
                    {
                        "group": group.name,
                        "details" : {
                            "nmi": top_nmi_record.serialize()['nmi'], 
                            "anc": top_anc_record.serialize()['anc'],
                            "latest_time": latest_time.serialize()['uploaded_time'],
                            "total_count": total_upload_count,
                            "today_count": today_upload_count
                        }
                    }
                )
            
        # TODO sort top_score_list_for_groups
        return Response(top_score_list_for_groups, status=status.HTTP_200_OK)


class Upload(APIView):
    
    authentication_classes = (CsrfExemptSessionAuthentication,)
    template = 'upload.html'
    
    def store_file_in_local(self, uploaded_file, path):
        with open(path, 'wb+') as destination:
            for chunk in uploaded_file.chunks():
                destination.write(chunk)

    def evaluate(self, filepath):
        """ This method is used to evalute the score of uploaded file 
        
        It should return the scores
        """

        # with open(filepath, 'r') as fd:
        #     for line in fd:
        #         print(line, end="")
        '''
        score_record_of_group = ScoreRecord.objects.filter(group=group)
        top_nmi_record = score_record_of_group.order_by('-nmi').first()
        top_anc_record = score_record_of_group.order_by('-anc').first()
        '''
        # TODO evaluate the record and it's score

        fpr_detect = open(filepath,'r')
        detect = fpr_detect.read()
        detect = detect.strip('\n')
        detect_list  = detect.split('\n')
        detect_cluster_num = len(detect_list)        

        print(detect_cluster_num)
        #### nmi 
        # detect_compare_nmi = []
        # for k in ans_dic_cluster.keys():
        #     if(k not in detect_dic_cluster.keys()):
        #         detect_compare_nmi.append(0)
        #     else:
        #         len_ans = 
        #         len_detect = len(detect_dic_cluster[k])
        #         if len_ans > len_detect:
        #             tmp = [-1]*(len_ans - len_detect)
        #             detect_dic_cluster[k].extend(tmp)
        #             detect_compare_nmi.append(normalized_mutual_info_score(ans_dic_cluster[k], detect_dic_cluster[k]))
                
        #         if len_ans < len_detect:
        #             same_list = list(set(detect_dic_cluster[k]).intersection(ans_dic_cluster[k]))
        #             tmp = [-1]*(len_ans - len(same_list))
        #             same_list.extend(tmp)

        #             detect_compare_nmi.append(normalized_mutual_info_score(ans_dic_cluster[k], same_list))
                
        #         if len_ans == len_detect:
        #             detect_compare_nmi.append(normalized_mutual_info_score(ans_dic_cluster[k], detect_dic_cluster[k]))      


        #### anc
        ans_cluster_num = 75149
        tmp_child =  abs(ans_cluster_num-detect_cluster_num)
        tmp_pa = (2*ans_cluster_num)
        anc_answer = 1-(tmp_child/tmp_pa)
        if anc_answer < 0:
            anc_answer = 0
        

        # store score record

        score_record = ScoreRecord()
        score_record.nmi = 0
        score_record.anc = anc_answer

        return score_record  

    def get(self, request):
        return render(request, Upload.template)

    def post(self, request):
        """處理上傳的檔案，並且計算分數
        """
        if not request.user.is_authenticated():
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        uploaded_file = request.FILES.get('result', None)

        if uploaded_file is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        # Determine Filename
        # TODO implement serial number for each group
        # filename: {date}-{serial}-{name}
        today = datetime.datetime.today()

        filename = '{date}-{name}'.format(
                #date=today.strftime("%Y-%m-%d"),
                date=today,
                name=uploaded_file.name
        )
        filepath = './file/{group}/{filename}'.format(
            #group=request.user.account_group.name,
            group=request.user.username,
            filename=filename
        )
        
        # Store file
        self.store_file_in_local(uploaded_file, filepath)
        score_record = self.evaluate(filepath)
        
        score_record.user = request.user
        score_record.group = request.user.account_group
        score_record.filename = filename
        score_record.save()
        
        return Response(score_record.serialize(), status=status.HTTP_200_OK)
